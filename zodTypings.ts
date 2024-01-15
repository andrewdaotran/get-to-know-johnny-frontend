import { z } from "zod";

export const basicInformationInput = z.object({
  title: z.string({ required_error: "Type in a title" }).min(1).max(50),
  description: z.string({ required_error: "Give a brief description" }).min(1),
});

export const informationBoxesInput = z.array(
  z.object({
    title: z.string({ required_error: "Type in a title" }).min(1).max(15),
    description: z
      .string({ required_error: "Give a brief description" })
      .min(1)
      .max(20),
    id: z.string(),
  })
);

export const informationBoxInput = z.object({
  title: z.string({ required_error: "Type in a title" }).min(1).max(15),
  description: z
    .string({ required_error: "Give a brief description" })
    .min(1)
    .max(20),
  id: z.string(),
});

export const descriptionInput = z.object({
  title: z.string({ required_error: "Type in a title" }).min(1).max(50),
  description: z.string({ required_error: "Give a brief description" }).min(1),
});

export const descriptionInputWithId = z.object({
  id: z.string(),
  title: z.string({ required_error: "Type in a title" }).min(1).max(50),
  description: z.string({ required_error: "Give a brief description" }).min(1),
});

export const hobbyInput = z.object({
  hobby: z.string({ required_error: "Type in a hobby" }).min(1).max(50),
  icon: z.string({ required_error: "Type in an emoji" }).min(1).max(2),
});

export const hobbyInputWithId = z.object({
  id: z.string(),
  hobby: z.string({ required_error: "Type in a hobby" }).min(1).max(50),
  icon: z.string({ required_error: "Type in an emoji" }).min(1).max(2),
});

export const userInput = z.object({
  email: z.string().email(),
  id: z.string(),
  image: z.string(),
  name: z.string(),
  status: z.string(),
});
