import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const { destinationId, rating, comment } = await req.json();

  if (!destinationId || !rating) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Check if user already reviewed
  const existing = await prisma.review.findFirst({
    where: { userId, destinationId },
  });
  if (existing) {
    return NextResponse.json({ error: "You already reviewed this destination" }, { status: 400 });
  }

  const review = await prisma.review.create({
    data: { userId, destinationId, rating: parseInt(rating), comment },
    include: { user: { select: { name: true } } },
  });

  // Update destination average rating
  const agg = await prisma.review.aggregate({
    where: { destinationId },
    _avg: { rating: true },
  });

  await prisma.destination.update({
    where: { id: destinationId },
    data: { rating: agg._avg.rating ?? 0 },
  });

  return NextResponse.json(review, { status: 201 });
}
