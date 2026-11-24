import Link from "next/link";
import type { Studio } from "@/lib/types";
import { localStudioImage } from "@/lib/images";

export default function StudioCard({ studio }: { studio: Studio }) {
  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow transition duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-neutral-900">
      <div className="overflow-hidden">
        <img src={localStudioImage(studio.title, studio.image)} alt={studio.title} className="h-48 w-full object-cover transition duration-300 group-hover:scale-110" />
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">{studio.category} • {studio.location}</p>
        <h3 className="mt-1 text-lg font-bold transition group-hover:text-[#B8860B]">{studio.title}</h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Capacity {studio.maxCapacity} people</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="font-bold">${studio.hourlyRate}<span className="text-sm font-normal"> / hour</span></p>
          <Link href={`/studios/${studio._id}`} className="btn btn-sm rounded-xl bg-gold text-black transition hover:scale-105 hover:shadow-lg">View Details</Link>
        </div>
      </div>
    </div>
  );
}