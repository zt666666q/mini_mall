import { auth, signOut } from "@/lib/auth";
import Link from "next/link";

export default async function Header() {
  const session = await auth();

  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold">
          Mini Mall
        </Link>

        {/* 导航链接 */}
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/products" className="hover:text-blue-600">
            商品
          </Link>

          {session?.user ? (
            <>
              <Link href="/cart" className="hover:text-blue-600">
                购物车
              </Link>
              <Link href="/orders" className="hover:text-blue-600">
                我的订单
              </Link>

              {session.user.role === "ADMIN" && (
                <Link href="/admin" className="hover:text-blue-600">
                  后台管理
                </Link>
              )}

              <span className="text-gray-500">{session.user.name}</span>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="text-gray-500 hover:text-red-600"
                >
                  退出
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-blue-600">
                登录
              </Link>
              <Link
                href="/auth/register"
                className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
              >
                注册
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
