# StudioSpace

Peer-to-peer creative workspace and production studio sharing platform. Studio owners can list their creative spaces, and creators can discover, inspect, and book them.

## Links

- Live Site: https://studiospace-client-gilt-eta.vercel.app/
- Backend API Live: https://studiospace-server-8exu.onrender.com
- Client Repo: https://github.com/mijanurdev/studiospace-client
- Server Repo: https://github.com/mijanurdev/studiospace-server
- GitHub Profile: https://github.com/mijanurdev

## Features

- Browse studios by 5 categories: Photo Studios, Sound Stages, Podcast Rooms, Music Suites, Art Workshops
- Home page with Swiper hero, Featured 6 studios, category marquee, How Booking Works and Host Guarantee
- Studios list with search, category filter and price sort
- Studio details with gallery, amenities, host and reviews, plus booking modal
- Login with Email/Password and Google, Register with password rules
- Add Studio, My Listings with Update/Delete, My Bookings with Cancel only on Pending
- Double-booking prevention with clear error message
- Light/dark theme toggle for the full site
- Toast messages with Sonner, custom confirm modals, no alert

## Tech Stack

- TypeScript
- Next.js App Router
- DaisyUI
- Swiper
- Sonner
- BetterAuth with MongoDB adapter and JWT plugin
- Express and MongoDB backend on port 8000

## Setup Locally

1. Clone the repo:

```bash
git clone https://github.com/mijanurdev/studiospace-client.git
cd studiospace-client
```

2. Install packages:

```bash
npm install
```

3. Create a `.env.local` file in the project root, see `.env.example` for the keys:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
BETTER_AUTH_SECRET=your-secret-here
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

4. Start the backend first on http://localhost:8000, then start the frontend:

```bash
npm run dev
```

Frontend runs on http://localhost:3000

## Examiner Test Credentials

Register first on the Register page, then login with the same account. For a quick check, create these two accounts from the Register page:

- Demo user: demo@studiospace.com / Demo1234
- Host user: host@studiospace.com / Host1234

Seed studios use ownerEmail `host@studiospace.com`, so if you register with host@studiospace.com you will see the 10 seed studios in My Listings. Or add a new studio as the demo user to test Add Studio, Update and Delete.

## Project Files

- src/app/page.tsx — Home page
- src/app/studios/page.tsx — Studios list
- src/app/studios/[id]/page.tsx — Studio details
- src/app/add-studio/page.tsx — Add Studio
- src/app/my-listings/page.tsx — My Listings
- src/app/studios/edit/[id]/page.tsx — Edit Studio
- src/app/my-bookings/page.tsx — My Bookings
- src/app/login/page.tsx — Login
- src/app/register/page.tsx — Register
- src/lib/auth.ts — BetterAuth setup
- src/lib/api.ts — Backend API helpers
- src/lib/types.ts — Studio and Booking types