import type { Destination, PrismaClient } from '@prisma/client'

export interface DestinationRepository {
  findAll(): Promise<Destination[]>
  findByCode(code: string): Promise<Destination | null>
}

export function createDestinationRepository(
  prisma: PrismaClient,
): DestinationRepository {
  return {
    findAll: () => prisma.destination.findMany({ orderBy: { id: 'asc' } }),
    findByCode: (code) => prisma.destination.findUnique({ where: { code } }),
  }
}
