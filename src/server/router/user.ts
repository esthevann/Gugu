import { createRouter } from "./context";
import { z } from 'zod';
import { TRPCError } from "@trpc/server";
import type { Gugu, User } from "@prisma/client";
import { Prisma } from "@prisma/client";

export type UserWithGugus = (User & {
    Gugu: (Gugu & {
        user: User;
    })[];
}) | null

export const userRouter = createRouter()
    .mutation("addHandle", {
        input: z.string(),
        async resolve({ ctx, input }) {
            let user = ctx.session?.user;
            if (!user || !user.id) throw new TRPCError({ code: "FORBIDDEN" });

            try {
                await ctx.prisma.user.update({
                    where: { id: user.id },
                    data: { handle: input, fullyCreated: true },
                    select: { fullyCreated: true }
                });
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') throw new TRPCError({ code: "CONFLICT" });
                }
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
            }
        }
    })
    .mutation("updateUserInfo", {
        input: z.object({
            name: z.string().nullish(),
            bio: z.string().nullish()
        }),
        async resolve({ ctx, input }) {
            let user = ctx.session?.user;
            if (!user || !user.id) throw new TRPCError({ code: "FORBIDDEN" });

            try {
                await ctx.prisma.user.update({
                    where: { id: user.id },
                    data: { name: input.name || undefined, Bio: input.bio || undefined },
                });
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') throw new TRPCError({ code: "CONFLICT" });
                }
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
            }
        }
    })
    .query("getUserById", {
        input: z.string(),
        async resolve({ ctx, input }) {
            let user = await ctx.prisma.user.findUnique({ where: { id: input }, 
                include: {
                     Gugu: true,
                     GugusLiked: { include: { likes: true } } 
                    }});
            return user
        }
    })
    .query("getUserByEmail", {
        input: z.string(),
        async resolve({ ctx, input }) {
            let user = await ctx.prisma.user.findUnique({ where: { email: input }, include: { Gugu: true, } })
            return user
        }
    })
    .query("getUserByHandle", {
        input: z.string(),
        async resolve({ ctx, input }) {
            let user: UserWithGugus | null = await ctx.prisma.user.findUnique({
                where: { handle: input },
                include: {
                    Gugu: {
                        include: {
                            user: true
                        }
                    }
                }
            });
            return user
        }
    });
