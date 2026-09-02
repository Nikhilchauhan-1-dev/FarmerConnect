import { PrismaClient } from "@prisma/client";

// Single shared Prisma client instance for the whole API process.
// Business modules should import this rather than instantiating their own.
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
});

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
