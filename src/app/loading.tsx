export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <img src="/logo.svg" alt="StudioSpace" className="h-12 w-auto animate-pulse dark:hidden" />
      <img src="/logo-dark.svg" alt="StudioSpace" className="hidden h-12 w-auto animate-pulse dark:block" />
      <p className="text-gray-600 dark:text-gray-300">Loading...</p>
    </div>
  );
}