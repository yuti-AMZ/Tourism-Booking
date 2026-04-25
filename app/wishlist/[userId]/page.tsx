import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

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
        <Image
          src="/images/Simien Mountains, Ethiopia.jpg"
          alt="Ethiopia"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10">
          <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center text-2xl font-bold text-red-400">H</div>
          <h1 className="text-3xl font-bold">{user.name}&apos;s Wishlist</h1>
          <p className="mt-2 text-sm text-white/70">
            {favorites.length} saved destination{favorites.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <div className="eth-stripe" />

      <div className="mx-auto max-w-5xl px-4 py-10">
        {favorites.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">This wishlist is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((favorite) => (
              <Link key={favorite.id} href={`/destinations/${favorite.destination.slug}`}>
                <div className="overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
                  {favorite.destination.images[0] ? (
                    <Image
                      src={favorite.destination.images[0]}
                      alt={favorite.destination.title}
                      width={640}
                      height={176}
                      unoptimized
                      className="h-44 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-44 w-full items-center justify-center bg-muted text-sm font-bold">ET</div>
                  )}
                  <div className="p-4">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{favorite.destination.category}</span>
                    <h3 className="mt-2 font-bold">{favorite.destination.title}</h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <span className="inline-block">Map</span>
                      {favorite.destination.location}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="font-bold text-primary">
                        ${favorite.destination.price}
                        <span className="text-xs font-normal text-muted-foreground"> / night</span>
                      </p>
                      <span className="flex items-center gap-1 text-xs text-yellow-500">
                        <span className="inline-block">*</span>
                        {favorite.destination.rating.toFixed(1)}
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
