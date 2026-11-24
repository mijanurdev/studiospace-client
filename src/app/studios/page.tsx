"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getStudios } from "@/lib/api";
import type { Studio } from "@/lib/types";
import StudioCard from "@/components/StudioCard";

const categories = ["All", "Photo Studios", "Sound Stages", "Podcast Rooms", "Music Suites", "Art Workshops"];

function StudiosInner() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [studios, setStudios] = useState<Studio[]>([]);
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    setCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  useEffect(() => {
    getStudios().then(setStudios);
  }, []);

  const filtered = useMemo(() => {
    const words = search.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let list = studios.filter((s) => {
      if (category !== "All" && s.category !== category) {
        return false;
      }
      if (words.length === 0) {
        return true;
      }
      const hay = `${s.title} ${s.location} ${s.category}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
    if (sort === "low") {
      list = [...list].sort((a, b) => a.hourlyRate - b.hourlyRate);
    }
    if (sort === "high") {
      list = [...list].sort((a, b) => b.hourlyRate - a.hourlyRate);
    }
    return list;
  }, [studios, search, sort, category]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Explore Studios</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{filtered.length} studios found</p>
      <div className="mt-6 flex flex-col gap-3 md:flex-row">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, location or category" className="w-full flex-1 rounded-xl border border-black bg-white px-4 py-2 text-black placeholder:text-gray-500 dark:border-white dark:bg-black dark:text-white dark:placeholder:text-gray-300" />
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full rounded-xl border border-black bg-white px-4 py-2 text-black md:w-auto dark:border-white dark:bg-black dark:text-white">
          <option value="default">Sort by default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button key={c} onClick={() => setCategory(c)} className={`btn rounded-xl ${category === c ? "bg-gold text-black" : "bg-white text-black dark:bg-neutral-900 dark:text-white"}`}>{c}</button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {filtered.map((s) => (
          <StudioCard key={s._id} studio={s} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="mt-8 rounded-xl border border-black bg-white p-6 text-center dark:border-white dark:bg-black">
          <p className="font-bold">No studios found{search ? ` for "${search}"` : ""}.</p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Try another name, location or category.</p>
          <button onClick={() => { setSearch(""); setCategory("All"); }} className="btn mt-4 rounded-xl bg-gold text-black">Clear search</button>
        </div>
      )}
    </div>
  );
}

export default function StudiosPage() {
  return (
    <Suspense>
      <StudiosInner />
    </Suspense>
  );
}