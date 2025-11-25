export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading...</p>
    </div>
  );
}
