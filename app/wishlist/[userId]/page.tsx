import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";


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
        <img src="/images/Simien Mountains, Ethiopia.jpg" alt="Ethiopia" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10">
          <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center text-red-400 text-3xl">❤</div>
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
                      <span className="inline-block">📍</span>{f.destination.location}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-bold text-primary">${f.destination.price}<span className="text-xs font-normal text-muted-foreground"> / night</span></p>
                      <span className="flex items-center gap-1 text-xs text-yellow-500">
                        <span className="inline-block">★</span>{f.destination.rating.toFixed(1)}
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
