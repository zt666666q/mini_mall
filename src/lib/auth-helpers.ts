import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * 获取当前 session，未登录则重定向到登录页
 */
export async function requireUser() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login");
  }
  return session;
}

/**
 * 获取当前 session，非管理员则重定向到首页
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }
  return session;
}

/**
 * 获取当前 session（不强制要求登录）
 */
export async function getSession() {
  return await auth();
}
