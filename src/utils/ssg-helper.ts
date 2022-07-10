import { createSSGHelpers } from '@trpc/react/ssg';
import { appRouter } from "../server/router";
import superjson from 'superjson';
import { prisma } from '../server/db/client';
import { Session } from 'next-auth';

export const ssg_helper = (session: Session) => {

   return createSSGHelpers({
        router: appRouter,
        // @ts-ignore
        ctx: {
            session: session,
            prisma,
        },
        transformer: superjson,
    });
}