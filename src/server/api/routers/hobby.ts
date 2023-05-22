import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "andrewdaotran/server/api/trpc";
import { hobbyInput } from "zodTypings";

export const hobbyRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const hobbies = await ctx.prisma.hobby.findMany();
    return hobbies;
  }),
  editHobby: publicProcedure
    .input(
      z.object({
        id: z.string(),
        hobby: z.string(),
        icon: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const hobby = await ctx.prisma.hobby.update({
        where: {
          id: input.id,
        },
        data: { hobby: input.hobby, icon: input.icon },
      });
      return hobby;
    }),
  createHobby: publicProcedure
    .input(hobbyInput)
    .mutation(async ({ ctx, input }) => {
      const hobby = await ctx.prisma.hobby.create({
        data: { hobby: input.hobby, icon: input.icon },
      });
      return hobby;
    }),
  removeHobby: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.hobby.delete({
        where: {
          id: input,
        },
      });
    }),
});
