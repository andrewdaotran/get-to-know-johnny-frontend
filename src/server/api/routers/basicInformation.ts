import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "andrewdaotran/server/api/trpc";
import { basicInformationInput, informationBoxInputWithId } from "zodTypings";

export const basicInformationRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const information = await ctx.prisma.basicInformation.findUnique({
      where: { id: "cli3ggh2z0000v5najtojhykc" },
      include: { InformationArray: true },
    });
    return information;
  }),
  editBasicInformation: publicProcedure
    .input(basicInformationInput)
    .mutation(async ({ ctx, input }) => {
      const basicInformation = await ctx.prisma.basicInformation.update({
        where: { id: "cli3ggh2z0000v5najtojhykc" },
        data: { description: input.description, title: input.title },
      });
      return basicInformation;
    }),
  editInformationBoxes: publicProcedure
    .input(informationBoxInputWithId)
    .mutation(async ({ ctx, input }) => {
      const informationBox = await ctx.prisma.informationBox.update({
        where: { id: input.id },
        data: { description: input.description, title: input.title },
      });
      return informationBox;
    }),
});
