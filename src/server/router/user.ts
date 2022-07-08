import { createRouter } from "./context";
import { z } from 'zod';
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";


export const userRouter = createRouter()
    .mutation("addHandle", {
        input: z.string(),
        async resolve({ ctx, input }) {
            let user = ctx.session?.user;
            if (!user || !user.email) throw new TRPCError({ code: "FORBIDDEN" });

            try {
                await ctx.prisma.user.update({
                    where: { email: user.email },
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
    .query("getUser", {
        input: z.string(),
        async resolve({ ctx, input }) {
           let user = await ctx.prisma.user.findFirst({ where: { email: input } })
           return user
        }
    });
