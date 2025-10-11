import z from "zod";

export const urlSchema = z.object({
  url: z.url("Please enter a valid url"),
});

export type UrlFormData = z.infer<typeof urlSchema>;
