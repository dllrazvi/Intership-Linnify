import { PrismaClient } from '@prisma/client';
import * as process from 'node:process';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient(
    process.env.DATABASE_URL
      ? { datasources: { db: { url: process.env.DATABASE_URL } } }
      : undefined
  );

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

// TODO Check if it's ok to export the entire primse types
// export * from '@prisma/client';
