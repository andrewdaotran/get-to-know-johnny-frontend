import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "andrewdaotran/server/api/trpc";

export const descriptionRouter = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),

  // getAll: protectedProcedure.query(async ({ctx}) => {
  //   const descriptions = await ctx.prisma.descriptionBox.findMany({
  //     where: {
  //       userId: ctx.session.user.id // Johnny's userId
  //     }
  //   })
  //   return descriptions
  // }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const descriptions = await ctx.prisma.descriptionBox.findMany();
    return descriptions;
  }),
  editDescription: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const description = await ctx.prisma.descriptionBox.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
        },
      });
      return description;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
