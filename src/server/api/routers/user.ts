import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "andrewdaotran/server/api/trpc";
import { userInput } from "zodTypings";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(userInput)
    .mutation(async ({ ctx, input }) => {
      const johnny = await ctx.prisma.user.findUnique({
        where: { id: input.id },
      });
      if (johnny?.id && johnny?.id === input.id) return;

      if (johnny?.id && johnny?.id !== input.id) {
        throw new Error("Not Johnny");
      }
      const user = await ctx.prisma.user.create({
        data: {
          ...input,
        },
      });
      return user;
    }),
  getJohnny: publicProcedure.query(async ({ ctx }) => {
    const johnny = await ctx.prisma.user.findMany();
    return johnny[0];
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany();
    return users;
  }),
  deleteUser: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.delete({
        where: { id: input },
      });
      return user;
    }),
});
