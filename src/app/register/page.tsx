"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signUp, signIn } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  function validPassword(value: string) {
    return value.length >= 6 && /[A-Z]/.test(value) && /[a-z]/.test(value);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validPassword(password)) {
      toast.error("Password needs Uppercase, Lowercase and minimum 6 characters");
      return;
    }
    setLoading(true);
    const result = await signUp.email({
      email,
      password,
      name,
      image: image || undefined,
      callbackURL: "/login",
    });
    setLoading(false);
    if (result.error) {
      toast.error("Register failed. Please try another email.");
      return;
    }
    toast.success("Account created. Please login.");
    router.push("/login");
  }

  async function googleRegister() {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-3xl font-bold">Register</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">Create your StudioSpace account.</p>
      <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1">Name
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-black bg-white px-4 py-2 text-black placeholder:text-gray-500 dark:border-white dark:bg-black dark:text-white dark:placeholder:text-gray-300" required />
        </label>
        <label className="flex flex-col gap-1">Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-black bg-white px-4 py-2 text-black placeholder:text-gray-500 dark:border-white dark:bg-black dark:text-white dark:placeholder:text-gray-300" required />
        </label>
        <label className="flex flex-col gap-1">Photo URL
          <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." className="w-full rounded-xl border border-black bg-white px-4 py-2 text-black placeholder:text-gray-500 dark:border-white dark:bg-black dark:text-white dark:placeholder:text-gray-300" />
        </label>
        <label className="flex flex-col gap-1">Password
          <div className="relative">
            <input type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-black bg-white px-4 py-2 pr-12 text-black placeholder:text-gray-500 dark:border-white dark:bg-black dark:text-white dark:placeholder:text-gray-300" required />
            <button type="button" onClick={() => setShow(!show)} aria-label="Show password" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-black dark:text-gray-300 dark:hover:text-white">
              {show ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.01 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.01-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Uppercase + Lowercase + minimum 6 characters</span>
        </label>
        <button type="submit" disabled={loading} className="btn w-full rounded-xl bg-gold text-black transition hover:scale-105 hover:shadow-lg">
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
      <button onClick={googleRegister} className="btn mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white text-black transition hover:scale-105 hover:shadow-lg">
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
          <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
        </svg>
        Continue with Google
      </button>
      <p className="mt-4 text-sm">Already have an account? <Link href="/login" className="font-bold underline">Login</Link></p>
    </div>
  );
}