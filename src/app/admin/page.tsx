export default function AdminDashboard() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">管理概览</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">商品总数</p>
          <p className="text-2xl font-bold">-</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">订单总数</p>
          <p className="text-2xl font-bold">-</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">待处理订单</p>
          <p className="text-2xl font-bold">-</p>
        </div>
      </div>
      <p className="mt-6 text-center text-gray-400">数据正在准备中...</p>
    </div>
  );
}
