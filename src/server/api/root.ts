import { createTRPCRouter } from "andrewdaotran/server/api/trpc";
import { descriptionRouter } from "andrewdaotran/server/api/routers/description";
import { hobbyRouter } from "andrewdaotran/server/api/routers/hobby";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  description: descriptionRouter,
  hobby: hobbyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
