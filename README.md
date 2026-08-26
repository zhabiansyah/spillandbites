# Spill & Bites — Scrollytelling Landing Page

A high-end, Awwwards-style Next.js landing page for the "Neo-Fast Food" brand
Spill & Bites, built around a scroll-scrubbed canvas image sequence of a
mozzarella-drenched fried chicken.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- **Motion** (`motion/react`, formerly Framer Motion)
- **Lenis** (`@studio-freight/lenis`) for inertial smooth scroll
- HTML5 Canvas for the image-sequence hero (no `<img>` thrash, GPU-friendly)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## About the image sequence

Your uploaded frames (`Fried_chicken_and_sauce_swirling_*.jpg`) have been
renamed sequentially into `public/sequence/chicken-frame-001.jpg` …
`chicken-frame-050.jpg`.

**Important:** the brief asked for 240 frames, but only **50** distinct
frames were included in your upload/zip. `SequenceScroll.tsx` is wired to
that reality — `TOTAL_FRAMES = 50` at the top of the file. The motion will
still play smoothly (Motion interpolates the scroll progress every tick and
rounds to the nearest available frame), but for the full cinematic
"drench" effect described in the brief, drop additional frames into
`public/sequence/` using the same zero-padded naming convention
(`chicken-frame-051.jpg`, `...-052.jpg`, up to `-240.jpg`) and bump
`TOTAL_FRAMES` in `components/SequenceScroll.tsx` to match.

### Background color match

The page background (`--spill-blue: #081C2E`) was sampled directly from the
corners of your source frames so the canvas edges disappear into the page.
If you regenerate the sequence with a different background, re-sample a
corner pixel and update `--spill-blue` in `app/globals.css` and
`spill-blue` / `spill-blue-deep` in `tailwind.config.ts`.

## Placeholder content

A few sections use deliberate placeholders since no menu photography,
testimonial headshots, or brand social links were supplied:

- **Bento menu grid** (`components/Bento.tsx`) — gradient tiles with
  emoji icons instead of product photography. Swap the `gradient`
  background for an `<img>`/`next/image` per item once you have real shots.
- **Testimonials** (`components/Testimonials.tsx`) — placeholder quotes
  and handles.
- **Delivery platform logos** (`public/logos/` + `components/RunningText.tsx`)
  — the marquee under every "Pesan Sekarang" button shows outline-card
  placeholders (not real GoFood/GrabFood/ShopeeFood/etc. logos — those
  are third-party trademarks and can't be generated here). Drop official
  SVG/PNG assets into `public/logos/` using the exact filenames already
  referenced in the `PLATFORMS` array in `RunningText.tsx`
  (`gofood.png`, `grabfood.png`, `shopeefood.png`, `travelokaeats.png`,
  `maximfood.png`, `website.png`) and they'll appear automatically.
- **Social/contact links** in `Navbar.tsx` and `Footer.tsx` point to
  placeholder URLs/emails — update to your real accounts.

## File guide

| File | Purpose |
|---|---|
| `app/layout.tsx` | Loads Outfit font, mounts Lenis provider + custom cursor |
| `app/page.tsx` | Assembles the full page |
| `app/globals.css` | Brand colors, Lenis/scrollbar/cursor CSS |
| `components/SequenceScroll.tsx` | **Core mechanic** — sticky canvas + scroll-linked frame draw + story text overlays |
| `components/Preloader.tsx` | Frame-preload progress screen |
| `components/SmoothScrollProvider.tsx` | Lenis setup + rAF loop |
| `components/Navbar.tsx` | Logo + fullscreen menu overlay |
| `components/TextReveal.tsx` | Character-split scroll-scrubbed reveal (used in About) |
| `components/Bento.tsx` | Menu bento grid |
| `components/Stats.tsx` | Count-up stats on scroll-into-view |
| `components/Testimonials.tsx` | Autoplay fullscreen quote slider |
| `components/CTASection.tsx` | Animated-blob CTA |
| `components/Footer.tsx` | Footer |
| `components/MagneticButton.tsx` | Magnetic CTA button used in hero + CTA section |

## Notes on the sticky-hero → content handoff

`SequenceScroll` renders a `h-[400vh]` container with a `sticky top-0
h-screen` canvas inside — this is the 4x scroll runway for the sequence.
Everything else in `page.tsx` sits in a `-mt-[100vh] relative z-10` wrapper
so it slides up and visually "closes" over the sticky hero exactly when the
400vh runway ends, per the brief.

## Mobile

The canvas uses cover-fit math (`components/SequenceScroll.tsx` → `draw()`)
so frames always fill the viewport without letterboxing on any aspect
ratio, and DPR is capped at 2x for performance on high-density phone
screens.

## Admin & SuperAdmin Panel

A working back-office lives at `/admin`, protected by `middleware.ts`.

### Demo accounts

| Role | Email | Password |
|---|---|---|
| Admin | `admin@spillandbites.com` | `admin123` |
| SuperAdmin | `superadmin@spillandbites.com` | `super123` |

Change these in `lib/auth.ts` (`DEMO_USERS`) — see the warning below.

### What's included

**Admin** (`/admin`):
- Dashboard with quick counts
- **Komplain & Keluhan** (`/admin/complaints`) — status (Baru/Diproses/
  Selesai), timestamps for received + resolved, who handled it
- **Artikel** (`/admin/articles`) — create/publish/unpublish/delete blog
  posts
- **Reservasi** (`/admin/reservations`) — confirm/cancel table bookings
  submitted from the public `/reservasi` page
- **Booking Ulang Tahun** (`/admin/birthday`) — confirm/cancel Spill
  Birthday package bookings submitted from `/menu#birthday`

**SuperAdmin** (everything above, plus):
- **Manajemen User** (`/admin/users`) — create staff accounts, change
  role (CUSTOMER/ADMIN/SUPERADMIN), block/unblock
- **Manajemen Promo** (`/admin/promos-manage`) — full promo CRUD with a
  `validUntil` expiry date
- **Laporan & Analitik** (`/admin/analytics`) — revenue chart (mock
  data), best sellers (mock data), complaint resolution rate (real data,
  computed from `/data/complaints.json`)

Role gating happens in two places: `middleware.ts` (blocks navigation to
SuperAdmin-only routes) and each API route re-checks the session
server-side before allowing writes.

### ⚠️ Important limitations — read before deploying

This backend is a **working prototype**, not production-ready as-is:

1. **Storage is flat JSON files** (`/data/*.json`), read/written via
   `lib/db.ts`. This works great for local development, but on
   serverless hosts (Vercel, Netlify, etc.) the filesystem is read-only
   at runtime, so writes will silently fail to persist. For real
   deployment, swap `readTable`/`writeTable` in `lib/db.ts` for queries
   against a real database (Postgres via Supabase/Neon is the easiest
   path to wire in without changing the rest of the app much, since the
   TypeScript types per resource — `Complaint`, `Reservation`,
   `BirthdayBooking`, `Article`, `AppUser`, `Promo` — are already
   defined next to each API route).
2. **Auth is a hardcoded demo.** `lib/auth.ts` has two accounts in
   plaintext and a session cookie that's just base64 (not signed or
   encrypted) — anyone who can read the cookie can forge a session. Swap
   this for a real auth library (NextAuth.js, Lucia, Clerk) with hashed
   passwords before this touches real users or real data.
3. **Revenue and best-seller numbers on the analytics page are mock
   data** (`app/api/analytics/route.ts`) — there's no real order/
   transaction model yet. Complaint resolution stats on that same page
   *are* real, computed live from the complaints data.
4. No rate limiting, audit log, or CSRF protection on the mutating API
   routes.

None of this blocks using the panel to demo the intended workflows
end-to-end (a reservation submitted on the public site really does show
up in the admin table in real time) — it just means a few pieces need
upgrading before going live with real customers and real staff.

