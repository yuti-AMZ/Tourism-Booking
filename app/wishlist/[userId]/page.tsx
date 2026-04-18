import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Star, Heart } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SharedWishlistPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true },
  });

  if (!user) notFound();

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: { destination: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen">
      <div className="relative py-14 text-center text-white">
        <img src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1400&auto=format&fit=crop" alt="Ethiopia" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10">
          <Heart className="w-8 h-8 text-red-400 mx-auto mb-3 fill-red-400" />
          <h1 className="text-3xl font-bold">{user.name}&apos;s Wishlist</h1>
          <p className="text-white/70 mt-2 text-sm">{favorites.length} saved destination{favorites.length !== 1 ? "s" : ""}</p>
        </div>
      </div>
      <div className="eth-stripe" />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">This wishlist is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((f) => (
              <Link key={f.id} href={`/destinations/${f.destination.slug}`}>
                <div className="border rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 duration-200 bg-card">
                  {f.destination.images[0] ? (
                    <img src={f.destination.images[0]} alt={f.destination.title} className="w-full h-44 object-cover" />
                  ) : (
                    <div className="w-full h-44 bg-muted flex items-center justify-center text-4xl">🇪🇹</div>
                  )}
                  <div className="p-4">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{f.destination.category}</span>
                    <h3 className="font-bold mt-2">{f.destination.title}</h3>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />{f.destination.location}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-bold text-primary">${f.destination.price}<span className="text-xs font-normal text-muted-foreground"> / night</span></p>
                      <span className="flex items-center gap-1 text-xs text-yellow-500">
                        <Star className="w-3 h-3 fill-yellow-500" />{f.destination.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
