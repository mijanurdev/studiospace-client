import Link from "next/link";

const steps = [
  { title: "Search", text: "Browse studios by category, location and price. Use search and filters to find the right space for your shoot, recording or workshop." },
  { title: "Pick a time", text: "Open a studio page, check the price, deposit and capacity, then pick your date and time slot." },
  { title: "Book", text: "Confirm your booking while logged in. If the time is already booked, you will see a clear error and can pick another time." },
  { title: "Create", text: "Arrive on time, meet your host, set up your gear, and start creating. Your booking stays in My Bookings." },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">How It Works</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">Booking a creative studio takes less than 2 minutes.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.title} className="rounded-xl bg-white p-5 shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-neutral-900">
            <p className="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-bold text-black">{i + 1}</p>
            <h2 className="mt-3 font-bold">{s.title}</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{s.text}</p>
          </div>
        ))}
      </div>
      <Link href="/studios" className="btn mt-8 rounded-xl bg-gold text-black transition hover:scale-105 hover:shadow-lg">Explore Studios</Link>
    </div>
  );
}