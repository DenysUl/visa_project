import type { Application, Prisma, PrismaClient } from '@prisma/client'

const withDestinationSummary = {
  destination: { select: { name: true, code: true } },
} satisfies Prisma.ApplicationInclude

export type ApplicationWithDestination = Prisma.ApplicationGetPayload<{
  include: typeof withDestinationSummary
}>

export interface NewApplication {
  fullName: string
  email: string
  citizenship: string
  destinationCode: string
  details: string
  userId: number | null
}

export interface ApplicationRepository {
  create(application: NewApplication): Promise<Application>
  findByUserId(userId: number): Promise<ApplicationWithDestination[]>
  findAll(): Promise<ApplicationWithDestination[]>
}

export function createApplicationRepository(
  prisma: PrismaClient,
): ApplicationRepository {
  return {
    create: (application) => prisma.application.create({ data: application }),

    findByUserId: (userId) =>
      prisma.application.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        include: withDestinationSummary,
      }),

    findAll: () =>
      prisma.application.findMany({
        orderBy: { createdAt: 'desc' },
        include: withDestinationSummary,
      }),
  }
}
