import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
  });

  if (users.length === 0) {
    console.log("No users found. Register first at http://localhost:3000/auth/register");
    return;
  }

  console.log("\n👥 Users in database:");
  users.forEach((u) => {
    console.log(`  - ${u.name} | ${u.email} | ${u.role}`);
  });
  console.log("");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
