import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "andrewdaotran/server/api/trpc";
import {
  basicInformationInput,
  informationBoxesInput,
  informationBoxInput,
} from "zodTypings";

export const authRouter = createTRPCRouter({
  // createBasicDescriptionBox: publicProcedure
  //   .input(descriptionInput)
  //   .mutation(async ({ ctx, input }) => {
  //     const description = await ctx.prisma.descriptionBox.create({
  //       data: { description: input.description, title: input.title },
  //     });
  //     return description;
  //   }),
  // createUser: publicProcedure
  //   .input(userInput)
  //   .mutation(async ({ ctx, input }) => {
  //     const user = await ctx.prisma.user.create({
  //       data: {
  //         email: input.email,
  //         password: input.password,
  //         role: input.role,
  //       },
  //     });
  //   }),
});
