import { z } from "zod";

export const descriptionInput = z.object({
  title: z.string({ required_error: "Type in a title" }).min(1).max(50),
  description: z.string({ required_error: "Give a brief description" }).min(1),
});
