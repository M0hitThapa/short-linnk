"use server";

import { ApiResponse } from "@/lib/types";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import z from "zod";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
});

export async function registerUser(
  formData: FormData
): Promise<ApiResponse<{ userId: string }>> {
  try {
    const validationFields = registerSchema.safeParse({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (!validationFields.success) {
      return {
        success: false,
        error:
          validationFields.error.flatten().fieldErrors.email?.[0] ||
          validationFields.error.flatten().fieldErrors.name?.[0] ||
          validationFields.error.flatten().fieldErrors.password?.[0] ||
          "Invalid data",
      };
    }

    const { name, email, password } = validationFields.data;

    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email.toLowerCase()),
    });

    if (existingUser) {
      return {
        success: false,
        error: "A user with this name is already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = nanoid();
    await db.insert(users).values({
      id: userId,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      success: true,
      data: { userId },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "An error occured , please try again",
    };
  }
}
