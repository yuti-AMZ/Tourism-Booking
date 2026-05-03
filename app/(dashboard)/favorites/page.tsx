import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function FavoritesPage() {
  const session = await getAuthSession();
  if (!session) redirect("/auth/login");

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: { destination: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
        <p className="text-muted-foreground">Destinations you've saved for later</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 border border-dashed rounded-xl">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
          <p className="text-muted-foreground mb-6">Start exploring to build your wishlist!</p>
          <Link href="/destinations" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium">
            Explore Destinations
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(({ destination }) => (
            <Link key={destination.id} href={`/destinations/${destination.slug}`} className="group block border rounded-xl overflow-hidden hover:shadow-lg transition-all bg-card">
              <div className="relative h-48">
                <Image
                  src={destination.images[0] || "/images/placeholder.jpg"}
                  alt={destination.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 p-2 rounded-full">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{destination.title}</h3>
                  <span className="font-bold text-primary">${destination.price}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {destination.location}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
