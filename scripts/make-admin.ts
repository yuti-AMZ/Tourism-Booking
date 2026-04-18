import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

const email = process.argv[2];

async function main() {
  if (!email) {
    console.error("Usage: npx tsx scripts/make-admin.ts your@email.com");
    process.exit(1);
  }

  const user = await prisma.user.update({
    where: { email },
    data: { role: "ADMIN" },
  });

  console.log(`✅ ${user.name} (${user.email}) is now ADMIN`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
