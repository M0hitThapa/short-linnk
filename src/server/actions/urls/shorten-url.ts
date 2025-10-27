import { ApiResponse } from "@/lib/types";
import { ensureHttps } from "@/lib/utils";
import { z } from "zod";
import { nanoid } from "nanoid";
import { db } from "@/server/db";
import { urls } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

const shortenUrlSchema = z.object({
  url: z.url(),
});

export async function shortenUrl(formData: FormData): Promise<
  ApiResponse<{
    shortUrl: string;
  }>
> {
  try {
    const url = formData.get("url") as string;

    const validatedFields = shortenUrlSchema.safeParse({
      url,
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error:
          validatedFields.error.flatten().fieldErrors.url?.[0] || "Invalid url",
      };
    }

    const originalUrl = ensureHttps(validatedFields.data.url);
    const shortCode = nanoid(6);

    const existingUrl = await db.query.urls.findFirst({
      where: (urls, { eq }) => eq(urls.shortCode, shortCode),
    });

    if (existingUrl) {
      return shortenUrl(formData);
    }

    await db.insert(urls).values({
      originalUrl,
      shortCode,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const shortUrl = `${baseUrl}/r${shortCode}`;
    revalidatePath("/");

    return {
      success: true,
      data: { shortUrl },
    };
  } catch (error) {
    console.log("falied to shorten url", error);
    return {
      success: false,
      error: "failed to shorten url",
    };
  }
}
