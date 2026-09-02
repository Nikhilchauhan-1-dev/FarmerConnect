// KisanSetu — database seed script (placeholder)
//
// Intentionally empty during the foundation phase: there are no models to
// seed yet. Once the schema from spec section 9 is implemented, this file
// should seed demo/reference data only (see spec principle #8 — "Demo
// reliability": prototype flows must work with seeded data) and must never
// hard-code business logic that belongs in the application layer.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("[seed] No models defined yet — nothing to seed.");
}

main()
  .catch((error) => {
    console.error("[seed] failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
