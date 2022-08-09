import { createRouter } from "./context";
import { z } from 'zod';
import { TRPCError } from "@trpc/server";
import { Gugu, Prisma } from "@prisma/client";

export const guguRouter = createRouter()
    .mutation("createGugu",
        {
            input: z.object({
                text: z.string()
            }),
            async resolve({ ctx, input }) {
                if (!ctx.session || !ctx.session.user) {
                    throw new TRPCError({ code: "UNAUTHORIZED" });
                }

                if (input.text.length > 4 || !input.text.length) {
                    throw new TRPCError({ code: "BAD_REQUEST" });
                }

                const userSelection = Prisma.validator<Prisma.UserSelect>()({
                    id: true,
                });

                let user: { id: string; } = await ctx.prisma.user.update({
                    where: {
                        email: ctx.session.user.email!
                    },
                    data: {
                        Gugu: {
                            create: {
                                content: input.text
                            }
                        }
                    },
                    select: userSelection
                });

                return user
            }
        }
    )
    .mutation("likeGugu", {
        input: z.string(),
        async resolve({ ctx, input }) {
            if (!ctx.session || !ctx.session.user?.id) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }

            await ctx.prisma.gugu.update({
                where: { id: input },
                data: {
                    likes: {
                        connect: {
                            id: ctx.session.user.id
                        },
                    },
                },
                select: {
                    id: true,
                }
            });
        }
    })
    .mutation("unlikeGugu", {
        input: z.string(),
        async resolve({ ctx, input }) {
            if (!ctx.session || !ctx.session.user?.id) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }
            await ctx.prisma.gugu.update({
                where: { id: input },
                data: {
                    likes: {
                        disconnect: {
                            id: ctx.session.user.id
                        },
                    },
                },
                select: {
                    id: true,
                }
            });
        }
    })
    .query("listAllGugus", {
        async resolve({ ctx }) {
            let d = await ctx.prisma.gugu.findMany({
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            handle: true,
                            image: true,
                        }
                    },
                    likes: {
                        select: {
                            _count: true
                        }
                    }
                }
            });
            let obj = d.map((gugu) => {
                return {
                    id: gugu.id,
                    content: gugu.content,
                    createdAt: gugu.createdAt,
                    userId: gugu.userId,
                    user: gugu.user,
                    likes: gugu.likes.length
                }
            })
            return obj;
        }
    })