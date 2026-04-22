import { execSync } from "node:child_process";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";
import { beforeEach, afterAll } from "vitest";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test", override: true });

execSync("npx prisma db push --accept-data-loss");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function truncateTables() {
  const tablenames = (await prisma.$queryRawUnsafe(
    "SELECT tablename FROM pg_tables WHERE schemaname = 'public'",
  )) as Array<{ tablename: string }>;

  const tables = tablenames
    .filter(({ tablename }) => tablename !== "_prisma_migrations")
    .map(({ tablename }) => `"public"."${tablename}"`)
    .join(", ");

  if (tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} RESTART IDENTITY CASCADE`);
  }
}

beforeEach(async () => {
  await truncateTables();
});

afterAll(async () => {
  await prisma.$disconnect();
});
