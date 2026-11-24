import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-3 text-gray-600 dark:text-gray-300">This page was not found.</p>
      <Link href="/" className="btn mt-6 rounded-xl bg-gold text-black transition hover:scale-105 hover:shadow-lg">Go Home</Link>
    </div>
  );
}