"use client";

import { loginAction, type ActionResult } from "@/lib/actions/auth.actions";
import { useActionState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [state, action, pending] = useActionState<ActionResult, FormData>(
    async (_prev, formData) => {
      const result = await loginAction(formData);
      if (result.success) {
        window.location.href = "/";
      }
      return result;
    },
    {}
  );

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-8 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold">登录</h1>

        <form action={action} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              邮箱
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入邮箱"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              密码
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入密码"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-500">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "登录中..." : "登录"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          还没有账号？{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            立即注册
          </Link>
        </p>
      </div>
    </div>
  );
}
