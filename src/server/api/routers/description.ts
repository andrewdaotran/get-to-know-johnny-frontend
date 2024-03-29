import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "andrewdaotran/server/api/trpc";
import { descriptionInput, descriptionInputWithId } from "zodTypings";

export const descriptionRouter = createTRPCRouter({
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
  // editDescriptions: publicProcedure
  //   .input(z.array(descriptionInputWithId))
  //   .mutation(async ({ ctx, input }) => {
  //     const descriptions = await ctx.prisma.descriptionBox.updateMany({
  //       where: {
  //         id: {
  //           in: input.map((description) => description.id),
  //         },
  //       },
  //       data: {
  //         title: input.map((description) => description.title),
  //         // {
  //         //   set: input.map((description) => description.title),
  //         // },
  //         description: {
  //           set: input.map((description) => description.description),
  //         },
  //       },
  //     });
  //     return descriptions;
  //   }),
  editDescription: publicProcedure
    .input(descriptionInputWithId)
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
  createBasicDescriptionBox: publicProcedure
    .input(descriptionInput)
    .mutation(async ({ ctx, input }) => {
      const description = await ctx.prisma.descriptionBox.create({
        data: { description: input.description, title: input.title },
      });
      return description;
    }),
  removeBasicDescriptionBox: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.descriptionBox.delete({
        where: {
          id: input,
        },
      });
    }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
