import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MapPin, Star } from "lucide-react";
import BookingForm from "@/components/booking/booking-form";
import FavoriteButton from "@/components/favorites/favorite-button";
import ReviewForm from "@/components/reviews/review-form";
import ImageCarousel from "@/components/destinations/image-carousel";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const destination = await prisma.destination.findUnique({
    where: { slug },
    include: {
      reviews: {
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!destination) notFound();

  const session = await getAuthSession();
  const userId = (session?.user as any)?.id;

  const [favorite, similar] = await Promise.all([
    userId ? prisma.favorite.findUnique({
      where: { userId_destinationId: { userId, destinationId: destination.id } },
    }) : null,
    prisma.destination.findMany({
      where: { category: destination.category, id: { not: destination.id } },
      take: 3,
      orderBy: { rating: "desc" },
    }),
  ]);

  const avgRating = destination.reviews.length
    ? destination.reviews.reduce((s, r) => s + r.rating, 0) / destination.reviews.length
    : destination.rating;

  const hasBooked = userId ? await prisma.booking.findFirst({
    where: { userId, destinationId: destination.id },
  }) : null;

  const hasReviewed = userId ? await prisma.review.findFirst({
    where: { userId, destinationId: destination.id },
  }) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      <ImageCarousel images={destination.images} title={destination.title} />

      <div className="flex items-start justify-between gap-4 mt-6">
        <div>
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
            {destination.category}
          </span>
          <h1 className="text-3xl font-bold mt-2">{destination.title}</h1>
          <p className="flex items-center gap-1 text-muted-foreground mt-1 text-sm">
            <MapPin className="w-4 h-4 text-primary" /> {destination.location}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className={`w-4 h-4 ${s <= Math.round(avgRating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              {avgRating.toFixed(1)} ({destination.reviews.length} review{destination.reviews.length !== 1 ? "s" : ""})
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="text-2xl font-bold text-primary">
            ${destination.price}<span className="text-sm font-normal text-muted-foreground"> / night</span>
          </p>
          {userId && <FavoriteButton destinationId={destination.id} initialFavorited={!!favorite} />}
        </div>
      </div>

      <p className="mt-5 text-muted-foreground leading-relaxed">{destination.description}</p>

      {userId && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Book this destination</h2>
          <BookingForm
            destinationId={destination.id}
            pricePerNight={destination.price}
            destinationTitle={destination.title}
            destinationLocation={destination.location}
          />
        </div>
      )}

      {!userId && (
        <div className="mt-8 border rounded-2xl p-6 text-center bg-card">
          <p className="text-muted-foreground mb-3">Sign in to book this destination</p>
          <Link href="/auth/login" className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
            Sign In
          </Link>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-5">Reviews</h2>

        {userId && hasBooked && !hasReviewed && (
          <div className="mb-6">
            <ReviewForm destinationId={destination.id} />
          </div>
        )}

        {userId && !hasBooked && (
          <div className="mb-6 border rounded-xl p-4 bg-muted/40 text-sm text-muted-foreground flex items-center gap-2">
            <span>💡</span> Book this destination first to leave a review.
          </div>
        )}

        {userId && hasBooked && hasReviewed && (
          <div className="mb-6 border rounded-xl p-4 bg-green-50 dark:bg-green-900/20 text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
            <span>✅</span> You have already reviewed this destination.
          </div>
        )}

        {destination.reviews.length === 0 ? (
          <p className="text-muted-foreground text-sm">No reviews yet. Be the first!</p>
        ) : (
          <div className="space-y-4">
            {destination.reviews.map((r) => (
              <div key={r.id} className="border rounded-xl p-4 bg-card">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                      {r.user.name?.charAt(0)?.toUpperCase() ?? "?"}
                    </div>
                    <span className="font-medium text-sm">{r.user.name ?? "Anonymous"}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                    ))}
                  </div>
                </div>
                {r.comment && <p className="text-sm text-muted-foreground">{r.comment}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {similar.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-5">Similar Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {similar.map((d) => (
              <Link key={d.id} href={`/destinations/${d.slug}`}>
                <div className="border rounded-xl overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 duration-200 bg-card">
                  {d.images[0] ? (
                    <img src={d.images[0]} alt={d.title} className="w-full h-32 object-cover" />
                  ) : (
                    <div className="w-full h-32 bg-muted flex items-center justify-center text-3xl">🇪🇹</div>
                  )}
                  <div className="p-3">
                    <h3 className="font-semibold text-sm">{d.title}</h3>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <MapPin className="w-3 h-3" />{d.location}
                    </p>
                    <p className="text-sm font-bold text-primary mt-1">
                      ${d.price}<span className="text-xs font-normal text-muted-foreground"> / night</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
