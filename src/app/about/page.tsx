import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">About StudioSpace</h1>
      <p className="mt-4">StudioSpace is a peer-to-peer platform for creative spaces in Dhaka. Studio owners list their photo studios, sound stages, podcast rooms, music suites and art workshops. Creators discover them, check the price and amenities, and book a time slot.</p>
      <p className="mt-4">Our goal is simple: no empty studios, no long searching. A photographer finds light, a podcaster finds quiet, a musician finds sound, an artist finds space — all in one place.</p>
      <div className="mt-8 rounded-xl bg-black p-8 text-white dark:border dark:border-white">
        <h2 className="text-xl font-bold">Host Guarantee</h2>
        <p className="mt-2 text-gray-300">Every booking is protected. Double-booking is blocked, and hosts and guests both see clear booking status at all times.</p>
      </div>
      <Link href="/studios" className="btn mt-8 rounded-xl bg-gold text-black transition hover:scale-105 hover:shadow-lg">Explore Studios</Link>
    </div>
  );
}