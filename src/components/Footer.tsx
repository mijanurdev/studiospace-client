"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const categories = ["Photo Studios", "Sound Stages", "Podcast Rooms", "Music Suites", "Art Workshops"];

export default function Footer() {
  const [email, setEmail] = useState("");

  function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    toast.success("Thanks for subscribing");
    setEmail("");
  }

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <p className="text-xl font-bold">StudioSpace</p>
          <p className="mt-3 text-sm text-gray-300">Peer-to-peer creative workspace and production studio sharing platform. Find a space, book it, create something great.</p>
        </div>
        <div>
          <p className="font-bold">Categories</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            {categories.map((c) => (
              <Link key={c} href={`/studios?category=${encodeURIComponent(c)}`}>{c}</Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/">Home</Link>
            <Link href="/studios">Explore Studios</Link>
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/about">About Us</Link>
          </div>
        </div>
        <div>
          <p className="font-bold">Newsletter</p>
          <p className="mt-3 text-sm text-gray-300">Get new studio updates in your inbox.</p>
          <form onSubmit={subscribe} className="mt-3 flex gap-2">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" className="input rounded-xl bg-white text-black" />
            <button type="submit" className="btn rounded-xl bg-gold">Join</button>
          </form>
          <p className="mt-4 text-sm">Follow us on X</p>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-400">StudioSpace — Book creative spaces in Dhaka</div>
    </footer>
  );
}