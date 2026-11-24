# StudioSpace — Frontend Assets

থিম: SoundLab dark hero + সোনালি-হলুদ #F0B90B, BeYoga sage #F3F4F0 / #E7ECE2, SceneSlot গঠন। বোতাম rounded-xl।

সব ছবি Unsplash থেকে যাচাই করা (2026-11-24, সবগুলো 200 OK, চোখে দেখে ক্যাটাগরি মিলিয়ে নেওয়া)। ২টা ছবি 404 পেয়ে বাদ দেওয়া হয়েছে।

## কোথায় বসাবে

VS Code-এ `studiospace-client` ফোল্ডারের ভেতরে `public` ফোল্ডার খোলো, তার ভেতরে `images` নামে ফোল্ডার বানাও। zip-এর ভেতরের সব `.jpg` আর `.svg` ফাইল ওই `public/images/`-এ কপি করো।

- লোগো: `public/logo.svg` (হালকা navbar-এর জন্য), `public/logo-dark.svg` (dark hero / কালো footer-এর জন্য)
- ছবি: `public/images/hero-1.jpg` — এইভাবে, `/images/hero-1.jpg` লিখে ব্যবহার করবে

## ১. লোগো — ২টা

| ফাইল | কোথায় ব্যবহার করবে |
|---|---|
| logo.svg | হালকা navbar / হালকা জায়গা — সোনালি ডিস্ক-রিং + কালো StudioSpace লেখা |
| logo-dark.svg | dark hero / কালো footer — সোনালি ডিস্ক + সাদা StudioSpace লেখা |

## ২. Hero স্লাইড — ৪টা (1600px, dark cinematic)

| ফাইল | কী দেখা যায় | স্লাইড |
|---|---|---|
| hero-1.jpg | ফটো স্টুডিও, সাদা ব্যাকড্রপ, বড় লাইট | Photo Studios |
| hero-2.jpg | সোনালি আলোর কনসার্ট স্টেজ, ভিড় | Sound Stages |
| hero-3.jpg | অন্ধকারে স্টুডিও মাইক্রোফোন | Podcast Rooms |
| hero-4.jpg | গিটার + মিক্সিং ডেস্ক, মিউজিক স্টুডিও | Music Suites |

Unsplash লিংক (আলাদা করে ডাউনলোড করতে চাইলে):
- hero-1: https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?auto=format&fit=crop&w=1600&q=80
- hero-2: https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1600&q=80
- hero-3: https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1600&q=80
- hero-4: https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80

## ৩. ক্যাটাগরি — ৫টা

৫টা ক্যাটাগরির ছবি seed স্টুডিওর ছবিই — তাই আলাদা ডাউনলোড লাগে না, একই ছবি অন্য নামে কপি করা আছে।

| ফাইল | ক্যাটাগরি |
|---|---|
| category-photo-studios.jpg | Photo Studios |
| category-sound-stages.jpg | Sound Stages |
| category-podcast-rooms.jpg | Podcast Rooms |
| category-music-suites.jpg | Music Suites |
| category-art-workshops.jpg | Art Workshops |

## ৪. Featured ৬টা — seed-এর ৬ স্টুডিও (এগুলোই আসল ডেটা)

এই ৬টাই Backend-এর `seed.js`-এ আছে, MongoDB-তে ঢুকেছে। Featured-এ `.limit(6)` দিলে এই ৬টাই আসবে।

| ফাইল | স্টুডিও | ক্যাটাগরি | ভাড়া | জায়গা |
|---|---|---|---|---|
| studio-lightbox.jpg | Lightbox Photo Studio | Photo Studios | $25/hr | Dhanmondi, Dhaka |
| studio-cineframe.jpg | CineFrame Sound Stage | Sound Stages | $80/hr | Banani, Dhaka |
| studio-voicebox.jpg | VoiceBox Podcast Room | Podcast Rooms | $20/hr | Uttara, Dhaka |
| studio-melody.jpg | Melody Music Suite | Music Suites | $35/hr | Mirpur, Dhaka |
| studio-canvas.jpg | Canvas Art Workshop | Art Workshops | $15/hr | Bashundhara, Dhaka |
| studio-golden-hour.jpg | Golden Hour Photo Studio | Photo Studios | $30/hr | Gulshan, Dhaka |

Unsplash লিংক (seed.js-এর একই লিংক):
- Lightbox: https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80
- CineFrame: https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80
- VoiceBox: https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80
- Melody: https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80
- Canvas: https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80
- Golden Hour: https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80

## ৫. অতিরিক্ত ৬টা — শুধু mockup / ডেমোর জন্য

সাবধান: এই ৬টা **seed-এ নেই, MongoDB-তেও নেই**। API থেকে এগুলো আসবে না। শুধু `/studios` পেজে ১২টা দেখাতে চাইলে, বা পরে Add Studio দিয়ে যোগ করার নমুনা হিসেবে রাখা।

| ফাইল | স্টুডিও (নমুনা নাম) | ক্যাটাগরি | জায়গা (নমুনা) |
|---|---|---|---|
| studio-framehouse.jpg | FrameHouse Photo Studio | Photo Studios | Uttara, Dhaka |
| studio-echopoint.jpg | EchoPoint Sound Stage | Sound Stages | Tejgaon, Dhaka |
| studio-silverscreen.jpg | SilverScreen Sound Stage | Sound Stages | Banani, Dhaka |
| studio-micdrop.jpg | MicDrop Podcast Room | Podcast Rooms | Dhanmondi, Dhaka |
| studio-harmony.jpg | Harmony Music Suite | Music Suites | Gulshan, Dhaka |
| studio-brushstroke.jpg | BrushStroke Art Workshop | Art Workshops | Mirpur, Dhaka |

Unsplash লিংক:
- FrameHouse: https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?auto=format&fit=crop&w=800&q=80 (hero-1-এর একই ছবি)
- EchoPoint: https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?auto=format&fit=crop&w=800&q=80
- SilverScreen: https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80
- MicDrop: https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80 (hero-3-এর একই ছবি)
- Harmony: https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=800&q=80
- BrushStroke: https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80

## মোট ফাইল

- লোগো: ২টা
- Hero: ৪টা
- ক্যাটাগরি: ৫টা
- স্টুডিও: ১২টা (৬টা seed + ৬টা অতিরিক্ত)
- মোট: ২৩টা ফাইল — সব `studiospace-assets.zip`-এ আছে

## মনে রাখার কথা

- seed-এর ৬টা স্টুডিওর ছবি DB-তে Unsplash লিংক হিসেবেই আছে। Frontend-এ লোকাল `/images/studio-*.jpg` ব্যবহার করতে চাইলে Frontend চ্যাটে বলবে, ওখানে ম্যাপিং করে দেবে।
- কোনো ছবিতে লেখা (text) নেই, তাই কার্ডে নাম বসাতে সমস্যা হবে না।
- নতুন স্টুডিও যোগ করলে তার ছবি imgbb / postimage-এ আপলোড করে Image URL দেবে — doc-এর নিয়ম এটাই।
