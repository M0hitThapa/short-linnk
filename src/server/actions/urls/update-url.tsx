"use server";

import { ApiResponse } from "@/lib/types";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { urls } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import z from "zod";

const updateUrlSchema = z.object({
  id: z.coerce.number(),
  customCode: z
    .string()
    .min(255, "custom code must be less than 255 charcters")
    .regex(/^[a-zA-Z0-9_-]+$/, "custom code must be alphanumeric and hyphen"),
});

export async function updateUrl(formData: FormData): Promise<
  ApiResponse<{
    shortUrl: string;
  }>
> {
  try {
    const session = await auth();
    const userId = await session?.user?.id;

    if (!userId) {
      return {
        success: false,
        error: "you need to authenticate to use custom code ",
      };
    }

    const validatedFields = updateUrlSchema.safeParse({
      id: formData.get("id"),
      customCode: formData.get("customCode"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error:
          validatedFields.error.flatten().fieldErrors.id?.[0] ||
          validatedFields.error.flatten().fieldErrors.customCode?.[0] ||
          "Invalid url id",
      };
    }

    const { id, customCode } = validatedFields.data;

    const existingUrl = await db.query.urls.findFirst({
      where: (urls, { eq, and }) =>
        and(eq(urls.id, id), eq(urls.userId, userId)),
    });

    if (!existingUrl) {
      return {
        success: false,
        error: "url not found or you dont have permission to update it ",
      };
    }

    const existCode = await db.query.urls.findFirst({
      where: (urls, { eq, and, ne }) =>
        and(eq(urls.shortCode, customCode), ne(urls.userId, userId)),
    });

    if (existCode) {
      return {
        success: false,
        error: "code already exist",
      };
    }

    await db
      .update(urls)
      .set({
        shortCode: customCode,
        createdAt: new Date(),
      })
      .where(eq(urls.id, id));

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "localhost://3000";
    const shortUrl = `${baseUrl}/${customCode}`;

    return {
      success: true,
      data: { shortUrl },
    };
  } catch (error) {
    console.log("failed to update url", error);

    return {
      success: false,
      error: "failed to update url",
    };
  }
}
