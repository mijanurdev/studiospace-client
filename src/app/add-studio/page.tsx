"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createStudio } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

const categories = ["Photo Studios", "Sound Stages", "Podcast Rooms", "Music Suites", "Art Workshops"];

export default function AddStudioPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [hourlyRate, setHourlyRate] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [amenities, setAmenities] = useState("");
  const [overview, setOverview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 py-10">
        <img src="/logo.svg" alt="StudioSpace" className="h-12 w-auto animate-pulse dark:hidden" />
        <img src="/logo-dark.svg" alt="StudioSpace" className="hidden h-12 w-auto animate-pulse dark:block" />
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await createStudio({
        title,
        category,
        hourlyRate: Number(hourlyRate),
        securityDeposit: Number(securityDeposit),
        maxCapacity: Number(maxCapacity),
        location,
        image,
        amenities: amenities.split(",").map((a) => a.trim()).filter(Boolean),
        overview,
      });
      toast.success("Studio added");
      router.push("/my-listings");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Studio add hoy ni");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold">Add Studio</h1>
      <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1">Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl border border-black bg-white px-4 py-2 text-black placeholder:text-gray-500 dark:border-white dark:bg-black dark:text-white dark:placeholder:text-gray-300" required />
        </label>
        <label className="flex flex-col gap-1">Category
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-xl border border-black bg-white px-4 py-2 text-black dark:border-white dark:bg-black dark:text-white">
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-1">Hourly Rate ($)
            <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} className="w-full rounded-xl border border-black bg-white px-4 py-2 text-black placeholder:text-gray-500 dark:border-white dark:bg-black dark:text-white dark:placeholder:text-gray-300" required />
          </label>
          <label className="flex flex-col gap-1">Security Deposit ($)
            <input type="number" value={securityDeposit} onChange={(e) => setSecurityDeposit(e.target.value)} className="w-full rounded-xl border border-black bg-white px-4 py-2 text-black placeholder:text-gray-500 dark:border-white dark:bg-black dark:text-white dark:placeholder:text-gray-300" required />
          </label>
          <label className="flex flex-col gap-1">Max Capacity
            <input type="number" value={maxCapacity} onChange={(e) => setMaxCapacity(e.target.value)} className="w-full rounded-xl border border-black bg-white px-4 py-2 text-black placeholder:text-gray-500 dark:border-white dark:bg-black dark:text-white dark:placeholder:text-gray-300" required />
          </label>
        </div>
        <label className="flex flex-col gap-1">Location
          <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded-xl border border-black bg-white px-4 py-2 text-black placeholder:text-gray-500 dark:border-white dark:bg-black dark:text-white dark:placeholder:text-gray-300" required />
        </label>
        <label className="flex flex-col gap-1">Image URL
          <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://... (imgbb / postimage link)" className="w-full rounded-xl border border-black bg-white px-4 py-2 text-black placeholder:text-gray-500 dark:border-white dark:bg-black dark:text-white dark:placeholder:text-gray-300" required />
        </label>
        <label className="flex flex-col gap-1">Amenities (comma diye alada koro)
          <input value={amenities} onChange={(e) => setAmenities(e.target.value)} placeholder="WiFi, Lights, AC" className="w-full rounded-xl border border-black bg-white px-4 py-2 text-black placeholder:text-gray-500 dark:border-white dark:bg-black dark:text-white dark:placeholder:text-gray-300" required />
        </label>
        <label className="flex flex-col gap-1">Overview
          <textarea value={overview} onChange={(e) => setOverview(e.target.value)} className="w-full rounded-xl border border-black bg-white px-4 py-2 text-black placeholder:text-gray-500 dark:border-white dark:bg-black dark:text-white dark:placeholder:text-gray-300" required />
        </label>
        <label className="flex flex-col gap-1">Email
          <input value={session.user.email} readOnly className="w-full rounded-xl border border-black bg-gray-100 px-4 py-2 text-black dark:border-white dark:bg-neutral-800 dark:text-white" />
        </label>
        <label className="flex flex-col gap-1">Name
          <input value={session.user.name || ""} readOnly className="w-full rounded-xl border border-black bg-gray-100 px-4 py-2 text-black dark:border-white dark:bg-neutral-800 dark:text-white" />
        </label>
        <button type="submit" disabled={loading} className="btn w-full rounded-xl bg-gold text-black transition hover:scale-105 hover:shadow-lg">
          {loading ? "Adding..." : "Add Studio"}
        </button>
      </form>
    </div>
  );
}