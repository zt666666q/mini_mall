"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold">出错了</h1>
      <p className="mb-6 text-gray-500">页面加载失败，请重试</p>
      <button
        onClick={() => reset()}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        重试
      </button>
    </div>
  );
}
