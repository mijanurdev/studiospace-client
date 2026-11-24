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
    <header className="sticky top-0 z-50 bg-sage shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-xl">S</span>
          StudioSpace
        </Link>
        <nav className="hidden items-center gap-5 md:flex">
          <Link href="/">Home</Link>
          <Link href="/studios">Explore Studios</Link>
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/about">About Us</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <div className="relative">
              <button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-xl border px-2 py-1">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold font-bold">
                    {user.name?.charAt(0) || "U"}
                  </span>
                )}
                <span className="hidden sm:block">{user.name}</span>
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white p-2 shadow-lg">
                  <Link href="/add-studio" className="block rounded-xl px-3 py-2 hover:bg-sage" onClick={() => setOpen(false)}>Add Studio</Link>
                  <Link href="/my-listings" className="block rounded-xl px-3 py-2 hover:bg-sage" onClick={() => setOpen(false)}>My Listings</Link>
                  <Link href="/my-bookings" className="block rounded-xl px-3 py-2 hover:bg-sage" onClick={() => setOpen(false)}>My Bookings</Link>
                  <button
                    onClick={async () => {
                      await signOut();
                      setOpen(false);
                      window.location.href = "/";
                    }}
                    className="w-full rounded-xl px-3 py-2 text-left hover:bg-sage"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost rounded-xl">Login</Link>
              <Link href="/register" className="btn rounded-xl bg-gold">Register</Link>
            </>
          )}
          <button onClick={() => setOpen(!open)} className="btn btn-ghost rounded-xl md:hidden">Menu</button>
        </div>
      </div>
      {open && !user && (
        <nav className="flex flex-col gap-2 px-4 pb-3 md:hidden">
          <Link href="/">Home</Link>
          <Link href="/studios">Explore Studios</Link>
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/about">About Us</Link>
        </nav>
      )}
    </header>
  );
}