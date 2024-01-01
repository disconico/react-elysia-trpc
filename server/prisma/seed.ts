import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const alice = await prisma.user.create({
      data: {
        firstName: "Alice",
        lastName: "Smith",
      },
    });

    const helloWorld = await prisma.post.create({
      data: {
        text: "Hello world",
      },
    });

    console.log("Seeding results:", { alice, helloWorld });
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
