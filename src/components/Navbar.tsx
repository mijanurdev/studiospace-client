"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 bg-sage text-charcoal shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold transition hover:scale-105">
          <img src="/logo.svg" alt="StudioSpace" className="h-9 w-auto" />
        </Link>
        <nav className="hidden items-center gap-5 md:flex">
          <Link href="/" className="transition hover:text-[#B8860B]">Home</Link>
          <Link href="/studios" className="transition hover:text-[#B8860B]">Explore Studios</Link>
          <Link href="/how-it-works" className="transition hover:text-[#B8860B]">How It Works</Link>
          <Link href="/about" className="transition hover:text-[#B8860B]">About Us</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <div className="relative">
              <button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-xl border px-2 py-1 transition hover:scale-105">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold font-bold text-black">
                    {user.name?.charAt(0) || "U"}
                  </span>
                )}
                <span className="hidden sm:block">{user.name}</span>
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white p-2 text-charcoal shadow-lg dark:bg-neutral-900 dark:text-white">
                  <Link href="/add-studio" className="block rounded-xl px-3 py-2 transition hover:bg-sage dark:hover:bg-neutral-800" onClick={() => setOpen(false)}>Add Studio</Link>
                  <Link href="/my-listings" className="block rounded-xl px-3 py-2 transition hover:bg-sage dark:hover:bg-neutral-800" onClick={() => setOpen(false)}>My Listings</Link>
                  <Link href="/my-bookings" className="block rounded-xl px-3 py-2 transition hover:bg-sage dark:hover:bg-neutral-800" onClick={() => setOpen(false)}>My Bookings</Link>
                  <button
                    onClick={async () => {
                      await signOut();
                      setOpen(false);
                      window.location.href = "/";
                    }}
                    className="w-full rounded-xl px-3 py-2 text-left transition hover:bg-sage dark:hover:bg-neutral-800"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="rounded-xl px-4 py-2 font-semibold text-charcoal transition hover:scale-105 hover:bg-black hover:text-white">Login</Link>
              <Link href="/register" className="btn rounded-xl bg-gold text-black transition hover:scale-105 hover:shadow-lg">Register</Link>
            </>
          )}
          <button onClick={() => setOpen(!open)} className="rounded-xl px-3 py-2 font-semibold text-charcoal transition hover:scale-105 hover:bg-black hover:text-white md:hidden">Menu</button>
        </div>
      </div>
      {open && !user && (
        <nav className="flex flex-col gap-2 px-4 pb-3 md:hidden">
          <Link href="/" className="transition hover:text-[#B8860B]">Home</Link>
          <Link href="/studios" className="transition hover:text-[#B8860B]">Explore Studios</Link>
          <Link href="/how-it-works" className="transition hover:text-[#B8860B]">How It Works</Link>
          <Link href="/about" className="transition hover:text-[#B8860B]">About Us</Link>
        </nav>
      )}
    </header>
  );
}