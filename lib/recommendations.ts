import { prisma } from "@/lib/prisma";

export async function getRecommendations(userId: string, limit = 4) {
  const [bookings, favorites] = await Promise.all([
    prisma.booking.findMany({
      where: { userId },
      include: { destination: { select: { category: true, location: true } } },
      take: 10,
    }),
    prisma.favorite.findMany({
      where: { userId },
      include: { destination: { select: { category: true, location: true } } },
      take: 10,
    }),
  ]);

  const visitedIds = [
    ...bookings.map((b) => b.destinationId),
    ...favorites.map((f) => f.destinationId),
  ];

  const categoryScore: Record<string, number> = {};

  [...bookings, ...favorites].forEach(({ destination }) => {
    categoryScore[destination.category] = (categoryScore[destination.category] ?? 0) + 1;
  });

  const topCategories = Object.entries(categoryScore)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([c]) => c);

  if (topCategories.length === 0) {
    return prisma.destination.findMany({ orderBy: { rating: "desc" }, take: limit });
  }

  return prisma.destination.findMany({
    where: { id: { notIn: visitedIds }, category: { in: topCategories } },
    orderBy: { rating: "desc" },
    take: limit,
  });
}
