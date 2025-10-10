"use client";

import z from "zod";

export const urlSchema = z.object({
  url: z.url("please enter a valid url"),
});

export type UrlFormData = z.infer<typeof urlSchema>;
