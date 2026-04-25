# Tourism Booking Platform

A full-stack tourism booking platform built with Next.js, Prisma, PostgreSQL, and NextAuth. The project supports user authentication, destination management, bookings, favorites, reviews, and an admin workflow for managing destinations.

## Features

- User registration and login
- Session-based authentication with NextAuth
- Dynamic destinations loaded from PostgreSQL
- Slug-based destination detail pages
- Admin destination creation
- Booking flow with date selection
- Favorites / wishlist
- User dashboard for bookings and saved destinations
- Profile editing with optional image upload
- Seeded Ethiopian tourism destinations using local project images

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Prisma ORM
- PostgreSQL
- NextAuth
- Tailwind CSS
- Cloudinary for image upload

## Project Structure

```text
app/
  api/               API routes for auth, bookings, destinations, favorites, profile, reviews, uploads
  auth/              Login, register, and auth redirect pages
  dashboard/         User dashboard
  destinations/      Destination list and slug detail pages
  profile/           User profile page
  wishlist/          Shared wishlist page
components/
  admin/             Admin-only forms
  auth/              Auth UI pieces
  booking/           Booking flow components
  destinations/      Destination UI components
  favorites/         Favorites interaction
  layout/            Navigation, sidebar, theming
  profile/           Profile editing form
lib/
  auth.ts            Session helper
  prisma.ts          Prisma client singleton
  language-context   Client language state
prisma/
  schema.prisma      Database schema
  seed.ts            Seed data for destinations
public/
  images/            Local destination images used by the app and seed data
```

## Database Models

The Prisma schema includes:

- `User`
- `Destination`
- `Booking`
- `Favorite`
- `Review`
- NextAuth support tables: `Account`, `Session`, `VerificationToken`

## Environment Variables

Create a `.env` file in the project root and add:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:5432/DATABASE?schema=public"
NEXTAUTH_SECRET="your-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
RESEND_API_KEY="your-resend-api-key"
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
NEXT_PUBLIC_HAS_CLOUDINARY="true"
```

Notes:

- `DATABASE_URL` is required
- `NEXTAUTH_SECRET` is required
- Google credentials are required if you want Google sign-in
- Cloudinary variables are required for real image uploads
- `NEXT_PUBLIC_HAS_CLOUDINARY` can be set to `"false"` if you want preview-only profile uploads

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Prisma Setup

Run the database migration:

```bash
npx prisma migrate dev
```

Seed the database with destination data:

```bash
npm run db:seed
```

The seed inserts destinations based on local images in `public/images`.

Important:

- The current seed clears destination-related records before reseeding
- That includes destinations, bookings, favorites, and reviews

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run db:seed
```

## Authentication Flow

- Users can register with email and password
- Users can log in with credentials
- Google sign-in is also configured
- Session data includes custom user fields such as `id` and `role`
- Admin access is protected by role checks on server-rendered pages and API routes

## Booking Flow

1. User opens a destination detail page
2. User selects dates and guest count
3. Booking is submitted through the booking API
4. Booking data is saved in PostgreSQL
5. The dashboard shows the booked trips

## Favorites / Wishlist Flow

- Users can add destinations to favorites
- Users can remove destinations from favorites
- Favorites are stored in the database
- The dashboard and shared wishlist page display saved destinations

## Admin Flow

- Admins can add destinations from the destinations page
- Admin destination creation is saved through the backend API
- Admin analytics and booking management pages are included

## Deployment Notes

This project can be deployed on platforms such as Vercel.

Recommended production setup:

- PostgreSQL database
- environment variables configured in the deployment platform
- Cloudinary configured for uploads
- NextAuth secret configured

## Current Status

Implemented and verified:

- `npm run lint` passes
- `npx tsc --noEmit` passes

Known local issue:

- On this Windows environment, `next build` can fail after compilation with a `spawn EPERM` error
- That appears to be environment-specific rather than a TypeScript or lint issue

## Architecture Summary

- App Router pages handle rendering and route structure
- API routes provide the backend endpoints for auth, bookings, destinations, favorites, profile updates, and reviews
- Prisma handles persistence and schema modeling
- NextAuth manages sessions and protected access
- Shared UI is componentized under `components/`
- Core logic and helpers live under `lib/`
