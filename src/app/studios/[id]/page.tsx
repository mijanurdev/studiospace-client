"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStudio } from "@/lib/api";
import type { Studio } from "@/lib/types";
import { localStudioImage } from "@/lib/images";
import { useSession } from "@/lib/auth-client";
import BookModal from "@/components/BookModal";

type Review = { name: string; text: string; rating: number };

const reviewsByStudio: Record<string, Review[]> = {
  "Lightbox Photo Studio": [
    { name: "Nusrat", text: "Perfect natural light, my portrait shoot came out amazing.", rating: 5 },
    { name: "Daniel", text: "Clean studio, helpful host, lights were ready on time.", rating: 4 },
    { name: "Priya", text: "Best photo studio in Dhanmondi, will book again.", rating: 5 },
  ],
  "CineFrame Sound Stage": [
    { name: "Arif", text: "Huge stage, great acoustics for our short film.", rating: 5 },
    { name: "Emily", text: "Professional setup, lighting rig was excellent.", rating: 4 },
    { name: "Hasan", text: "Booked for a music video, everything was perfect.", rating: 5 },
  ],
  "VoiceBox Podcast Room": [
    { name: "Tanvir", text: "Crystal clear sound, no background noise at all.", rating: 5 },
    { name: "Maria", text: "Cozy room, mic quality is really good.", rating: 4 },
    { name: "Rakib", text: "Recorded 3 episodes here, never had a problem.", rating: 5 },
  ],
  "Melody Music Suite": [
    { name: "Sara", text: "Piano sounds beautiful, great for practice.", rating: 5 },
    { name: "John", text: "Good instruments, quiet place to record.", rating: 4 },
    { name: "Anika", text: "Loved the vibe, perfect for our band rehearsal.", rating: 5 },
  ],
  "Canvas Art Workshop": [
    { name: "Farhana", text: "Bright space, lots of room for my painting class.", rating: 5 },
    { name: "David", text: "Good tables and light, students loved it.", rating: 4 },
    { name: "Mim", text: "Perfect workshop for art lovers.", rating: 5 },
  ],
  "Golden Hour Photo Studio": [
    { name: "Rahim", text: "Evening light here is magical for photos.", rating: 5 },
    { name: "Sofia", text: "Beautiful studio, host helped with setup.", rating: 4 },
    { name: "Imran", text: "My wedding shoot photos came out stunning.", rating: 5 },
  ],
  "FrameHouse Photo Studio": [
    { name: "Nabila", text: "Nice backdrop options, easy to book.", rating: 4 },
    { name: "Chris", text: "Great for product shoots, very clean.", rating: 5 },
    { name: "Sadia", text: "Friendly host, perfect light all day.", rating: 5 },
  ],
  "EchoPoint Sound Stage": [
    { name: "Kamal", text: "Big stage, sound system is top class.", rating: 5 },
    { name: "Laura", text: "Good for our drama rehearsal, plenty of space.", rating: 4 },
    { name: "Fahim", text: "Best sound stage in Tejgaon.", rating: 5 },
  ],
  "MicDrop Podcast Room": [
    { name: "Tania", text: "Mic quality is superb, editing was easy.", rating: 5 },
    { name: "Alex", text: "Quiet room, perfect for interviews.", rating: 4 },
    { name: "Rifat", text: "Recorded my first podcast here, loved it.", rating: 5 },
  ],
  "Harmony Music Suite": [
    { name: "Mehjabin", text: "Beautiful piano, peaceful place to compose.", rating: 5 },
    { name: "Tom", text: "Good acoustics, instruments in great shape.", rating: 4 },
    { name: "Lamia", text: "My band practices here every week now.", rating: 5 },
  ],
};

const defaultReviews: Review[] = [
  { name: "Rahim", text: "Clean space, good light, host was helpful.", rating: 5 },
  { name: "Sara", text: "Easy booking, the room was ready on time.", rating: 4 },
  { name: "Tanvir", text: "Great sound quality, I will book again.", rating: 5 },
];

export default function StudioDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [studio, setStudio] = useState<Studio | null>(null);
  const [showBook, setShowBook] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    getStudio(id).then(setStudio);
  }, [id]);

  if (!studio) {
    return <p className="mx-auto max-w-6xl px-4 py-10">Loading studio...</p>;
  }

  function bookNow() {
    if (!session?.user) {
      router.push("/login");
      return;
    }
    setShowBook(true);
  }

  const studioReviews = reviewsByStudio[studio.title] || defaultReviews;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/studios" className="rounded-xl px-4 py-2 font-semibold transition hover:bg-black hover:text-white">Back to Studios</Link>
      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <img src={localStudioImage(studio.title, studio.image)} alt={studio.title} className="h-96 w-full rounded-xl object-cover" />
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{studio.category} • {studio.location}</p>
          <h1 className="mt-1 text-3xl font-bold">{studio.title}</h1>
          <p className="mt-3 text-xl font-bold">${studio.hourlyRate} / hour</p>
          <p className="mt-1 text-gray-600 dark:text-gray-300">Security Deposit: ${studio.securityDeposit}</p>
          <p className="mt-1 text-gray-600 dark:text-gray-300">Max Capacity: {studio.maxCapacity} people</p>
          <p className="mt-4">{studio.overview}</p>
          <div className="mt-4">
            <p className="font-bold">Amenities</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {studio.amenities.map((a) => (
                <span key={a} className="rounded-xl bg-sage-dark px-3 py-1 text-sm dark:bg-neutral-800">{a}</span>
              ))}
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-sage-dark p-4 dark:bg-neutral-900">
            <p className="font-bold">Host</p>
            <p>{studio.ownerName}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{studio.ownerEmail}</p>
          </div>
          <button onClick={bookNow} className="btn mt-6 rounded-xl bg-gold text-black transition hover:scale-105 hover:shadow-lg">Book Workspace Now</button>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {studioReviews.map((r) => (
            <div key={r.name} className="rounded-xl bg-white p-4 shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-neutral-900">
              <p className="font-bold">{r.name}</p>
              <p className="text-gold">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
      {showBook && <BookModal studio={studio} onClose={() => setShowBook(false)} />}
    </div>
  );
}