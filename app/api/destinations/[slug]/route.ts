import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const destination = await prisma.destination.findUnique({
    where: { slug: params.slug },
    include: {
      reviews: {
        include: { user: { select: { name: true, avatar: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!destination) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(destination);
}
