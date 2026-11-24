"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { getStudios } from "@/lib/api";
import type { Studio } from "@/lib/types";
import { localStudioImage } from "@/lib/images";
import StudioCard from "@/components/StudioCard";

const categories = [
  { name: "Photo Studios", image: "/images/category-photo-studios.jpg" },
  { name: "Sound Stages", image: "/images/category-sound-stages.jpg" },
  { name: "Podcast Rooms", image: "/images/category-podcast-rooms.jpg" },
  { name: "Music Suites", image: "/images/category-music-suites.jpg" },
  { name: "Art Workshops", image: "/images/category-art-workshops.jpg" },
];

const steps = [
  { title: "Search", text: "Find a studio by category, location and price." },
  { title: "Pick a time", text: "Choose your date and time slot." },
  { title: "Book", text: "Confirm your booking in one click." },
  { title: "Create", text: "Arrive, set up, and start creating." },
];

export default function Home() {
  const [featured, setFeatured] = useState<Studio[]>([]);
  const [hero, setHero] = useState<Studio[]>([]);

  useEffect(() => {
    getStudios(undefined, 6).then((data) => {
      setFeatured(data);
      setHero(data.slice(0, 4));
    });
  }, []);

  return (
    <div>
      <section className="bg-black text-white">
        <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 4000 }} pagination={{ clickable: true }} className="mx-auto max-w-6xl">
          {hero.length > 0 ? hero.map((s) => (
            <SwiperSlide key={s._id}>
              <div className="relative flex min-h-[420px] items-center px-6 py-16">
                <img src={localStudioImage(s.title, s.image)} alt={s.title} className="absolute inset-0 h-full w-full object-cover opacity-50" />
                <div className="relative">
                  <p className="inline-block w-fit rounded-full bg-gold px-3 py-1 text-sm font-bold text-black">{s.category}</p>
                  <h1 className="mt-4 max-w-xl text-4xl font-bold md:text-5xl">{s.title}</h1>
                  <p className="mt-3 text-gray-200">{s.location} • ${s.hourlyRate} / hour • Capacity {s.maxCapacity}</p>
                  <div className="mt-6 flex gap-3">
                    <Link href={`/studios/${s._id}`} className="btn rounded-xl bg-gold text-black transition hover:scale-105 hover:shadow-lg">Book Workspace Now</Link>
                    <Link href="/studios" className="btn rounded-xl bg-white text-black transition hover:scale-105 hover:shadow-lg">Explore Studios</Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )) : (
            <SwiperSlide>
              <div className="flex min-h-[420px] items-center px-6 py-16">
                <div>
                  <h1 className="text-4xl font-bold md:text-5xl">Book a creative studio in Dhaka</h1>
                  <p className="mt-3 text-gray-200">Photo, sound, podcast, music and art spaces, all in one place.</p>
                  <Link href="/studios" className="btn mt-6 rounded-xl bg-gold text-black transition hover:scale-105 hover:shadow-lg">Explore Studios</Link>
                </div>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Studios</h2>
          <Link href="/studios" className="btn btn-ghost rounded-xl text-charcoal transition hover:scale-105 hover:bg-black hover:text-white dark:text-white">View All</Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {featured.map((s) => (
            <StudioCard key={s._id} studio={s} />
          ))}
        </div>
        {featured.length === 0 && <p className="mt-6 text-gray-600 dark:text-gray-300">No studios yet. Please start the backend server and run the seed.</p>}
      </section>

      <section className="bg-sage-dark py-10 dark:bg-neutral-900">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold">Browse by Category</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            {categories.map((c) => (
              <Link key={c.name} href={`/studios?category=${encodeURIComponent(c.name)}`} className="group overflow-hidden rounded-xl bg-white shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-neutral-800">
                <div className="overflow-hidden">
                  <img src={c.image} alt={c.name} className="h-32 w-full object-cover transition duration-300 group-hover:scale-110" />
                </div>
                <p className="p-3 font-bold transition group-hover:text-[#B8860B]">{c.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="overflow-hidden bg-black py-3 text-gold dark:bg-gold dark:text-neutral-800">
        <div className="animate-marquee flex w-max gap-8 whitespace-nowrap font-bold">
          {[...categories, ...categories].map((c, i) => (
            <span key={i}>{c.name} • </span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-bold">How Booking Works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-xl bg-white p-5 shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-neutral-900">
              <p className="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-bold text-black">{i + 1}</p>
              <h3 className="mt-3 font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-xl bg-black p-8 text-white">
          <h2 className="text-2xl font-bold">Host Guarantee</h2>
          <p className="mt-3 text-gray-300">Every booking is protected. If a studio is not as listed, we help you find another space or get your money back. Hosts keep their deposit safe, guests keep their time safe.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-gray-900 p-4 transition hover:-translate-y-1"><p className="font-bold">6 Studios</p><p className="text-sm text-gray-300">Across 5 categories in Dhaka</p></div>
            <div className="rounded-xl bg-gray-900 p-4 transition hover:-translate-y-1"><p className="font-bold">Secure Booking</p><p className="text-sm text-gray-300">Double-booking is blocked</p></div>
            <div className="rounded-xl bg-gray-900 p-4 transition hover:-translate-y-1"><p className="font-bold">Real Hosts</p><p className="text-sm text-gray-300">Verified studio owners</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}