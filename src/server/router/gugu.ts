import { createRouter } from "./context";
import { z } from 'zod';
import { trpc } from "../../utils/trpc";
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