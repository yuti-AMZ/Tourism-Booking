import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MapPin, Calendar, Users, Heart, LayoutDashboard, Sparkles } from "lucide-react";
import CancelButton from "@/components/booking/cancel-button";
import { getRecommendations } from "@/lib/recommendations";
import ShareWishlist from "@/components/dashboard/share-wishlist";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getAuthSession();
  if (!session) redirect("/auth/login");

  const userId = (session.user as any).id;

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

      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-5xl mx-auto px-4 py-8 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold flex-shrink-0">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Dashboard</span>
            </div>
            <h1 className="text-2xl font-bold mt-0.5">Welcome back, {session.user?.name}</h1>
            <p className="text-sm text-muted-foreground">{session.user?.email}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Bookings", value: bookings.length  },
            { label: "Saved Places", value: favorites.length },
            { label: "Confirmed", value: bookings.filter(b => b.status === "CONFIRMED").length },
            { label: "Pending", value: bookings.filter(b => b.status === "PENDING").length },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-4 bg-card border hover:shadow-sm transition-shadow">
              <div className="text-xl mb-1"></div>
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Bookings */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" /> My Bookings
            </h2>
            <Link href="/destinations" className="text-xs text-primary hover:underline font-medium">
              + New booking
            </Link>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12 border rounded-2xl bg-card">
              <div className="text-4xl mb-3">🏕️</div>
              <p className="text-muted-foreground text-sm mb-3">No bookings yet</p>
              <Link href="/destinations" className="text-primary font-semibold hover:underline text-sm">
                Explore destinations →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((b) => (
                <div key={b.id} className="border rounded-xl p-4 flex gap-4 items-start bg-card hover:shadow-sm transition-shadow">
                  {b.destination.images[0] ? (
                    <img src={b.destination.images[0]} alt={b.destination.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-xl flex-shrink-0">🇪🇹</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <h3 className="font-semibold text-sm">{b.destination.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                        b.status === "CONFIRMED" ? "bg-primary/10 text-primary" :
                        b.status === "CANCELLED" ? "bg-destructive/10 text-destructive" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {b.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" /> {b.destination.location}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(b.checkIn).toLocaleDateString()} → {new Date(b.checkOut).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" /> {b.guests} guest{b.guests > 1 ? "s" : ""}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm font-bold text-primary">${b.totalPrice}</p>
                    {b.status === "PENDING" && <CancelButton bookingId={b.id} />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Favorites */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" /> Saved Destinations
            </h2>
            <ShareWishlist userId={userId} />
          </div>

          {favorites.length === 0 ? (
            <div className="text-center py-12 border rounded-2xl bg-card">
              <div className="text-4xl mb-3">💚</div>
              <p className="text-muted-foreground text-sm">No saved destinations yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((f) => (
                <Link key={f.id} href={`/destinations/${f.destination.slug}`}>
                  <div className="border rounded-xl overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 duration-200 bg-card">
                    {f.destination.images[0] ? (
                      <img src={f.destination.images[0]} alt={f.destination.title} className="w-full h-32 object-cover" />
                    ) : (
                      <div className="w-full h-32 bg-muted flex items-center justify-center text-3xl">🇪🇹</div>
                    )}
                    <div className="p-3">
                      <h3 className="font-semibold text-sm">{f.destination.title}</h3>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="w-3 h-3" /> {f.destination.location}
                      </p>
                      <p className="mt-1 text-sm font-bold text-primary">
                        ${f.destination.price}
                        <span className="text-xs font-normal text-muted-foreground"> / night</span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
        {/* Recommendations */}
        {recommendations.length > 0 && (
          <section className="mt-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold">Recommended for You</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendations.map((d) => (
                <Link key={d.id} href={`/destinations/${d.slug}`}>
                  <div className="border rounded-xl overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 duration-200 bg-card">
                    {d.images[0] ? (
                      <img src={d.images[0]} alt={d.title} className="w-full h-28 object-cover" />
                    ) : (
                      <div className="w-full h-28 bg-muted flex items-center justify-center text-3xl">🇪🇹</div>
                    )}
                    <div className="p-3">
                      <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{d.category}</span>
                      <h3 className="font-semibold text-sm mt-1 line-clamp-1">{d.title}</h3>
                      <p className="text-xs font-bold text-primary mt-1">${d.price}<span className="font-normal text-muted-foreground"> / night</span></p>
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
