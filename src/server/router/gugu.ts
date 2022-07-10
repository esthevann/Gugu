import { createRouter } from "./context";
import { z } from 'zod';
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";

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

                if (input.text.length > 4){
                    throw new TRPCError({ code: "BAD_REQUEST" });
                }

                const userSelection = Prisma.validator<Prisma.UserSelect>()({
                    id: true,
                    Gugu: true
                });

                let user = await ctx.prisma.user.update({
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
    .query("listAllGugus", {
        async resolve({ ctx }) {
            let d = await ctx.prisma.gugu.findMany({ include: { user: true } });
            return d
        }
    })