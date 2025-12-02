"use server";

import { ApiResponse } from "@/lib/types";
import { db } from "@/server/db";
import { urls } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getUrlByShortCode(
  shortCode: string
): Promise<ApiResponse<{ originalUrl: string }>> {
  try {
    const url = await db.query.urls.findFirst({
      where: (urls, { eq }) => eq(urls.shortCode, shortCode),
    });

    if (!url) {
      return {
        success: false,
        error: "url not found",
      };
    }

    await db
      .update(urls)
      .set({
        clicks: url.clicks + 1,
        updatedAt: new Date(),
      })
      .where(eq(urls.shortCode, shortCode));

    return {
      success: true,
      data: {
        originalUrl: url.originalUrl,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "An error occured while fetching the url",
    };
  }
}
