import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: { destination: true },
    orderBy: { createdAt: "desc" },
  });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true },
  });

  return NextResponse.json({ user, favorites });
}
