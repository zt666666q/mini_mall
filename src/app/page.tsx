import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero 区域 */}
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">欢迎来到 Mini Mall</h1>
        <p className="mb-6 text-lg text-gray-600">
          发现精选好物，享受便捷购物体验
        </p>
        <Link
          href="/products"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          浏览商品
        </Link>
      </section>

      {/* 占位提示 */}
      <section className="text-center text-gray-400">
        <p>商品数据正在准备中，敬请期待...</p>
      </section>
    </div>
  );
}
