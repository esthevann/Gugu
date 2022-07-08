// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { guguRouter } from "./gugu";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("auth.", authRouter)
  .merge("gugu.", guguRouter)
  .merge("user.", userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
