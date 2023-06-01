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

export const basicInformationRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const information = await ctx.prisma.basicInformation.findUnique({
      where: { id: "cli3ggh2z0000v5najtojhykc" },
    });
    return information;
  }),
  getInformationBoxes: publicProcedure.query(async ({ ctx }) => {
    const informationBoxes = await ctx.prisma.informationBox.findMany({
      where: {
        basicInformationId: "cli3ggh2z0000v5najtojhykc",
      },
    });
    return informationBoxes;
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
    .input(informationBoxesInput)
    .mutation(async ({ ctx, input }) => {
      const informationBoxes = await ctx.prisma.informationBox.findMany();
      informationBoxes.map(async (box, index) => {
        await ctx.prisma.informationBox.update({
          where: { id: box.id },
          data: {
            ...box,
            title: input[index]?.title,
            description: input[index]?.description,
          },
        });
      });
      return informationBoxes;
    }),
  editInformationBox: publicProcedure
    .input(informationBoxInput)
    .mutation(async ({ ctx, input }) => {
      const informationBox = await ctx.prisma.informationBox.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
        },
      });
      return informationBox;
    }),
});
