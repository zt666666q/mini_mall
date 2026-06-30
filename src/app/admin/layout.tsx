import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-6xl gap-6 px-4 py-6">
      {/* 侧边导航 */}
      <aside className="w-48 shrink-0">
        <nav className="space-y-1 text-sm">
          <Link
            href="/admin"
            className="block rounded-md px-3 py-2 hover:bg-gray-100"
          >
            概览
          </Link>
          <Link
            href="/admin/products"
            className="block rounded-md px-3 py-2 hover:bg-gray-100"
          >
            商品管理
          </Link>
          <Link
            href="/admin/categories"
            className="block rounded-md px-3 py-2 hover:bg-gray-100"
          >
            分类管理
          </Link>
          <Link
            href="/admin/orders"
            className="block rounded-md px-3 py-2 hover:bg-gray-100"
          >
            订单管理
          </Link>
        </nav>
      </aside>

      {/* 主内容区 */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
