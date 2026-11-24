"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cancelBooking, getBookings } from "@/lib/api";
import type { Booking } from "@/lib/types";
import { localStudioImage } from "@/lib/images";
import { useSession } from "@/lib/auth-client";

export default function MyBookingsPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [toCancel, setToCancel] = useState<Booking | null>(null);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (session?.user?.email) {
      getBookings(session.user.email).then(setBookings);
    }
  }, [session]);

  async function confirmCancel() {
    if (!toCancel) {
      return;
    }
    try {
      await cancelBooking(toCancel._id);
      toast.success("Booking cancelled");
      setBookings((prev) => prev.map((b) => (b._id === toCancel._id ? { ...b, status: "Cancelled" } : b)));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Cancel hoy ni");
    } finally {
      setToCancel(null);
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
      <h1 className="text-3xl font-bold">My Bookings</h1>
      <div className="mt-6 grid gap-4">
        {bookings.map((b) => (
          <div key={b._id} className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-neutral-900 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              {b.studioImage && <img src={localStudioImage(b.studioTitle, b.studioImage)} alt={b.studioTitle} className="h-20 w-28 rounded-xl object-cover" />}
              <div>
                <p className="font-bold">{b.studioTitle}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{b.date} • {b.startTime} - {b.endTime}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">${b.hourlyRate} / hour</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-sage-dark px-3 py-1 text-sm font-bold dark:bg-neutral-800">{b.status}</span>
              {b.status === "Pending" && (
                <button onClick={() => setToCancel(b)} className="btn btn-sm rounded-xl bg-red-500 text-white transition hover:scale-105">Cancel</button>
              )}
            </div>
          </div>
        ))}
      </div>
      {bookings.length === 0 && <p className="mt-8 text-gray-600 dark:text-gray-300">You have no bookings yet.</p>}
      {toCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 dark:bg-neutral-900">
            <h3 className="text-lg font-bold">Cancel this booking?</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{toCancel.studioTitle} on {toCancel.date}</p>
            <div className="mt-4 flex gap-2">
              <button onClick={confirmCancel} className="btn flex-1 rounded-xl bg-red-500 text-white">Confirm Cancel</button>
              <button onClick={() => setToCancel(null)} className="btn flex-1 rounded-xl">Keep Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}