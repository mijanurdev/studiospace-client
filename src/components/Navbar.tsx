"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 bg-sage text-black shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2">
        <Link href="/" className="flex min-w-0 shrink items-center">
          <img src="/logo.svg" alt="StudioSpace" className="h-8 w-auto max-w-[150px] object-contain md:h-9" />
        </Link>
        <nav className="hidden items-center gap-5 md:flex">
          <Link href="/" className="transition hover:text-yellow-700">Home</Link>
          <Link href="/studios" className="transition hover:text-yellow-700">Explore Studios</Link>
          <Link href="/how-it-works" className="transition hover:text-yellow-700">How It Works</Link>
          <Link href="/about" className="transition hover:text-yellow-700">About Us</Link>
        </nav>
        <div className="flex shrink-0 items-center gap-1.5">
          <ThemeToggle />
          {user && (
            <div className="relative">
              <button onClick={() => setUserOpen(!userOpen)} className="flex items-center gap-2 rounded-xl border border-black/20 px-1.5 py-1">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold font-bold">
                    {user.name?.charAt(0) || "U"}
                  </span>
                )}
                <span className="hidden sm:block">{user.name}</span>
              </button>
              {userOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white p-2 text-black shadow-lg">
                  <Link href="/add-studio" className="block rounded-xl px-3 py-2 hover:bg-sage" onClick={() => setUserOpen(false)}>Add Studio</Link>
                  <Link href="/my-listings" className="block rounded-xl px-3 py-2 hover:bg-sage" onClick={() => setUserOpen(false)}>My Listings</Link>
                  <Link href="/my-bookings" className="block rounded-xl px-3 py-2 hover:bg-sage" onClick={() => setUserOpen(false)}>My Bookings</Link>
                  <button
                    onClick={async () => {
                      await signOut();
                      setUserOpen(false);
                      window.location.href = "/";
                    }}
                    className="w-full rounded-xl px-3 py-2 text-left hover:bg-sage"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="hidden items-center gap-2 md:flex">
            {!user && (
              <>
                <Link href="/login" className="rounded-xl px-3 py-2 transition hover:bg-black hover:text-white">Login</Link>
                <Link href="/register" className="rounded-xl bg-gold px-3 py-2 font-bold transition hover:scale-105">Register</Link>
              </>
            )}
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/20 md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-black/10 px-4 py-3 md:hidden">
          <Link href="/" className="rounded-xl px-3 py-2 hover:bg-black/5" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/studios" className="rounded-xl px-3 py-2 hover:bg-black/5" onClick={() => setMenuOpen(false)}>Explore Studios</Link>
          <Link href="/how-it-works" className="rounded-xl px-3 py-2 hover:bg-black/5" onClick={() => setMenuOpen(false)}>How It Works</Link>
          <Link href="/about" className="rounded-xl px-3 py-2 hover:bg-black/5" onClick={() => setMenuOpen(false)}>About Us</Link>
          {user ? (
            <>
              <Link href="/add-studio" className="rounded-xl px-3 py-2 hover:bg-black/5" onClick={() => setMenuOpen(false)}>Add Studio</Link>
              <Link href="/my-listings" className="rounded-xl px-3 py-2 hover:bg-black/5" onClick={() => setMenuOpen(false)}>My Listings</Link>
              <Link href="/my-bookings" className="rounded-xl px-3 py-2 hover:bg-black/5" onClick={() => setMenuOpen(false)}>My Bookings</Link>
              <button
                onClick={async () => {
                  await signOut();
                  setMenuOpen(false);
                  window.location.href = "/";
                }}
                className="rounded-xl px-3 py-2 text-left hover:bg-black/5"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="mt-1 rounded-xl border border-black px-3 py-2 text-center" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link href="/register" className="rounded-xl bg-gold px-3 py-2 text-center font-bold" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}