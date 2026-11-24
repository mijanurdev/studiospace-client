"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBooking } from "@/lib/api";
import type { Studio } from "@/lib/types";
import { useSession } from "@/lib/auth-client";

export default function BookModal({ studio, onClose }: { studio: Studio; onClose: () => void }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("12:00");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!session?.user) {
      router.push("/login");
      return;
    }
    if (!date) {
      toast.error("Please pick a date");
      return;
    }
    if (startTime >= endTime) {
      toast.error("End time must be after start time");
      return;
    }
    setLoading(true);
    try {
      await createBooking({
        studioId: studio._id,
        date,
        startTime,
        endTime,
        userEmail: session.user.email,
        userName: session.user.name || "Guest",
      });
      toast.success("Booking created");
      onClose();
      router.push("/my-bookings");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Booking hoy ni");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 dark:bg-neutral-900">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Book {studio.title}</h3>
          <button onClick={onClose} className="rounded-xl px-3 py-1 font-semibold transition hover:bg-black hover:text-white">Close</button>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">${studio.hourlyRate} / hour • Deposit ${studio.securityDeposit}</p>
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
          <label className="flex flex-col gap-1">Date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-xl border border-black bg-white px-4 py-2 text-black dark:border-white dark:bg-black dark:text-white" required />
          </label>
          <label className="flex flex-col gap-1">Start Time
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full rounded-xl border border-black bg-white px-4 py-2 text-black dark:border-white dark:bg-black dark:text-white" required />
          </label>
          <label className="flex flex-col gap-1">End Time
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full rounded-xl border border-black bg-white px-4 py-2 text-black dark:border-white dark:bg-black dark:text-white" required />
          </label>
          <button type="submit" disabled={loading} className="btn rounded-xl bg-gold text-black transition hover:scale-105 hover:shadow-lg">
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}