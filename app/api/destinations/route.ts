import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const location = searchParams.get("location");

  const destinations = await prisma.destination.findMany({
    where: {
      ...(category && { category }),
      ...(location && { location: { contains: location, mode: "insensitive" } }),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(destinations);
}

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, description, location, price, images, category, slug } = body;

  if (!title || !description || !location || !price || !category || !slug) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const destination = await prisma.destination.create({
    data: { title, description, location, price, images: images ?? [], category, slug },
  });

  return NextResponse.json(destination, { status: 201 });
}
