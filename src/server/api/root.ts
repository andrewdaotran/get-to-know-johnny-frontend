import { createTRPCRouter } from "andrewdaotran/server/api/trpc";
import { descriptionRouter } from "andrewdaotran/server/api/routers/description";
import { hobbyRouter } from "andrewdaotran/server/api/routers/hobby";
import { basicInformationRouter } from "andrewdaotran/server/api/routers/basicInformation";
import { userRouter } from "./routers/user";
import { submitContactRouter } from "./routers/submitContact";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  description: descriptionRouter,
  hobby: hobbyRouter,
  basicInformation: basicInformationRouter,
  user: userRouter,
  submitContact: submitContactRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
