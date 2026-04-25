import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MapPin, Calendar, Users, Heart, LayoutDashboard, Sparkles } from "lucide-react";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CancelButton from "@/components/booking/cancel-button";
import ShareWishlist from "@/components/dashboard/share-wishlist";
import { getRecommendations } from "@/lib/recommendations";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getAuthSession();
  if (!session) redirect("/auth/login");

  const userId = session.user.id;

  const [bookings, favorites, recommendations] = await Promise.all([
    prisma.booking.findMany({
      where: { userId },
      include: { destination: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.favorite.findMany({
      where: { userId },
      include: { destination: true },
      orderBy: { createdAt: "desc" },
    }),
    getRecommendations(userId),
  ]);

  const initials = session.user?.name?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-8">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Dashboard</span>
            </div>
            <h1 className="mt-0.5 text-2xl font-bold">Welcome back, {session.user?.name}</h1>
            <p className="text-sm text-muted-foreground">{session.user?.email}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total Bookings", value: bookings.length },
            { label: "Saved Places", value: favorites.length },
            { label: "Confirmed", value: bookings.filter((b) => b.status === "CONFIRMED").length },
            { label: "Pending", value: bookings.filter((b) => b.status === "PENDING").length },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border bg-card p-4 transition-shadow hover:shadow-sm">
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Calendar className="h-5 w-5 text-primary" /> My Bookings
            </h2>
            <Link href="/destinations" className="text-xs font-medium text-primary hover:underline">
              + New booking
            </Link>
          </div>

          {bookings.length === 0 ? (
            <div className="rounded-2xl border bg-card py-12 text-center">
              <div className="mb-3 text-4xl font-black tracking-[0.2em] text-primary">ET</div>
              <p className="mb-3 text-sm text-muted-foreground">No bookings yet</p>
              <Link href="/destinations" className="text-sm font-semibold text-primary hover:underline">
                Explore destinations {"->"}
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((booking) => (
                <div key={booking.id} className="flex items-start gap-4 rounded-xl border bg-card p-4 transition-shadow hover:shadow-sm">
                  {booking.destination.images[0] ? (
                    <Image
                      src={booking.destination.images[0]}
                      alt={booking.destination.title}
                      width={64}
                      height={64}
                      unoptimized
                      className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold">ET</div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold">{booking.destination.title}</h3>
                      <span
                        className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                          booking.status === "CONFIRMED"
                            ? "bg-primary/10 text-primary"
                            : booking.status === "CANCELLED"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {booking.destination.location}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(booking.checkIn).toLocaleDateString()} {"->"} {new Date(booking.checkOut).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" /> {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm font-bold text-primary">${booking.totalPrice}</p>
                    {booking.status === "PENDING" && <CancelButton bookingId={booking.id} />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Heart className="h-5 w-5 text-primary" /> Saved Destinations
            </h2>
            <ShareWishlist userId={userId} />
          </div>

          {favorites.length === 0 ? (
            <div className="rounded-2xl border bg-card py-12 text-center">
              <div className="mb-3 text-4xl font-black tracking-[0.2em] text-primary">ET</div>
              <p className="text-sm text-muted-foreground">No saved destinations yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((favorite) => (
                <Link key={favorite.id} href={`/destinations/${favorite.destination.slug}`}>
                  <div className="overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    {favorite.destination.images[0] ? (
                      <Image
                        src={favorite.destination.images[0]}
                        alt={favorite.destination.title}
                        width={400}
                        height={128}
                        unoptimized
                        className="h-32 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-32 w-full items-center justify-center bg-muted text-sm font-bold">ET</div>
                    )}
                    <div className="p-3">
                      <h3 className="text-sm font-semibold">{favorite.destination.title}</h3>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {favorite.destination.location}
                      </p>
                      <p className="mt-1 text-sm font-bold text-primary">
                        ${favorite.destination.price}
                        <span className="text-xs font-normal text-muted-foreground"> / night</span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {recommendations.length > 0 && (
          <section className="mt-10">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">Recommended for You</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {recommendations.map((destination) => (
                <Link key={destination.id} href={`/destinations/${destination.slug}`}>
                  <div className="overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    {destination.images[0] ? (
                      <Image
                        src={destination.images[0]}
                        alt={destination.title}
                        width={400}
                        height={112}
                        unoptimized
                        className="h-28 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-28 w-full items-center justify-center bg-muted text-sm font-bold">ET</div>
                    )}
                    <div className="p-3">
                      <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-xs text-primary">{destination.category}</span>
                      <h3 className="mt-1 line-clamp-1 text-sm font-semibold">{destination.title}</h3>
                      <p className="mt-1 text-xs font-bold text-primary">
                        ${destination.price}
                        <span className="font-normal text-muted-foreground"> / night</span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
