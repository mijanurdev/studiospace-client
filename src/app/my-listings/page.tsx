"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteStudio, getStudios } from "@/lib/api";
import type { Studio } from "@/lib/types";
import { localStudioImage } from "@/lib/images";
import { useSession } from "@/lib/auth-client";

export default function MyListingsPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [studios, setStudios] = useState<Studio[]>([]);
  const [toDelete, setToDelete] = useState<Studio | null>(null);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (session?.user?.email) {
      getStudios().then((all) => {
        setStudios(all.filter((s) => s.ownerEmail === session.user.email));
      });
    }
  }, [session]);

  async function confirmDelete() {
    if (!toDelete) {
      return;
    }
    try {
      await deleteStudio(toDelete._id);
      toast.success("Studio deleted");
      setStudios((prev) => prev.filter((s) => s._id !== toDelete._id));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete hoy ni");
    } finally {
      setToDelete(null);
    }
  }

  if (isPending || !session?.user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 py-10">
        <img src="/logo.svg" alt="StudioSpace" className="h-12 w-auto animate-pulse dark:hidden" />
        <img src="/logo-dark.svg" alt="StudioSpace" className="hidden h-12 w-auto animate-pulse dark:block" />
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Listings</h1>
        <Link href="/add-studio" className="btn rounded-xl bg-gold text-black transition hover:scale-105 hover:shadow-lg">Add Studio</Link>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {studios.map((s) => (
          <div key={s._id} className="overflow-hidden rounded-xl bg-white shadow transition duration-300 hover:-translate-y-2 hover:shadow-lg dark:bg-neutral-900">
            <img src={localStudioImage(s.title, s.image)} alt={s.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-bold">{s.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{s.category} • ${s.hourlyRate} / hour</p>
              <div className="mt-3 flex gap-2">
                <Link href={`/studios/edit/${s._id}`} className="btn btn-sm rounded-xl bg-gold text-black transition hover:scale-105">Update</Link>
                <button onClick={() => setToDelete(s)} className="btn btn-sm rounded-xl bg-red-500 text-white transition hover:scale-105">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {studios.length === 0 && <p className="mt-8 text-gray-600 dark:text-gray-300">You have no listings yet. Add your first studio.</p>}
      {toDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 dark:bg-neutral-900">
            <h3 className="text-lg font-bold">Delete this studio?</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{toDelete.title} will be removed.</p>
            <div className="mt-4 flex gap-2">
              <button onClick={confirmDelete} className="btn flex-1 rounded-xl bg-red-500 text-white">Confirm Delete</button>
              <button onClick={() => setToDelete(null)} className="btn flex-1 rounded-xl">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}