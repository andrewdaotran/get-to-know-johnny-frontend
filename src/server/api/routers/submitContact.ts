import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "andrewdaotran/server/api/trpc";
import { submitContactInput, submitContactInputWithId } from "zodTypings";

export const submitContactRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const contactList = await ctx.prisma.submitContact.findMany();
    return contactList;
  }),
  createContact: publicProcedure
    .input(submitContactInput)
    .mutation(async ({ ctx, input }) => {
      const contact = await ctx.prisma.submitContact.create({
        data: input,
      });
      return contact;
    }),
  editContact: protectedProcedure
    .input(submitContactInputWithId)
    .mutation(async ({ ctx, input }) => {
      const contact = await ctx.prisma.submitContact.update({
        where: {
          id: input.id,
        },
        data: input,
      });
      return contact;
    }),
  deleteContact: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const contact = await ctx.prisma.submitContact.delete({
        where: {
          id: input,
        },
      });
      return contact;
    }),
});
