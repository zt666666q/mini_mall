"use server";

import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

export type ActionResult = {
  success?: boolean;
  error?: string;
};

/**
 * 注册新用户，注册成功后自动登录
 */
export async function registerAction(formData: FormData): Promise<ActionResult> {
  // 解析表单数据
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // Zod 校验
  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "输入数据无效";
    return { error: firstError };
  }

  const { name, email, password } = parsed.data;

  try {
    // 检查邮箱是否已被注册
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { error: "该邮箱已被注册" };
    }

    // 创建用户
    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: { name, email, hashedPassword },
    });

    // 自动登录
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "登录失败，请重试" };
    }
    throw error; // 非认证错误继续抛出
  }
}

/**
 * 登录
 */
export async function loginAction(formData: FormData): Promise<ActionResult> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    await signIn("credentials", {
      email: raw.email,
      password: raw.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "邮箱或密码错误" };
    }
    throw error;
  }
}
