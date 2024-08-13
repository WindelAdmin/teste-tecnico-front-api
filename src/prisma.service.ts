import { PrismaClient } from '@prisma/client';

const newPrisma = new PrismaClient();

declare global {
  var prisma: typeof newPrisma;
}

let prisma = globalThis.prisma ?? newPrisma;

globalThis.prisma = prisma;

export { prisma };
