import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "andrewdaotran/server/api/trpc";
import { hobbyInput, hobbyInputWithId } from "zodTypings";

export const hobbyRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const hobbies = await ctx.prisma.hobby.findMany();
    return hobbies;
  }),
  editHobby: publicProcedure
    .input(hobbyInputWithId)

    .mutation(async ({ ctx, input }) => {
      const hobby = await ctx.prisma.hobby.update({
        where: {
          id: input.id,
        },
        data: {
          hobby: input.hobby,
          icon: input.icon,
          isFocused: input.isFocused || false,
          isMakingNewPuck: input.isMakingNewPuck || false,
          isHobbySubmitted: input.isHobbySubmitted || false,
        },
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
