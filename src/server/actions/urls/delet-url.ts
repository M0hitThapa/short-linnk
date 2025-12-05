"use server";

import { ApiResponse } from "@/lib/types";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { urls } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function deleteUrl(urlId: number): Promise<ApiResponse<null>> {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        success: false,
        error: "unauthorized",
      };
    }

    const [url] = await db.select().from(urls).where(eq(urls.id, urlId));
    if (!url) {
      return {
        success: false,
        error: "url not found",
      };
    }

    if (url.userId && url.userId !== session.user.id) {
      return {
        success: false,
        error: "unauthorized",
      };
    }

    await db.delete(urls).where(eq(urls.id, urlId));

    return {
      success: true,
      data: null,
    };
  } catch {
    console.log("error deleting url");
    return {
      success: false,
      error: "An error occured",
    };
  }
}
