import type { Application } from '@prisma/client'
import { HttpError } from '../../lib/http-error.js'
import type { DestinationRepository } from '../destinations/destinations.repository.js'
import type {
  ApplicationRepository,
  ApplicationWithDestination,
} from './applications.repository.js'
import type { SubmitApplicationInput } from './applications.validation.js'

export interface ApplicationService {
  /** `userId` links the application to an account when the applicant is signed in */
  submit(
    input: SubmitApplicationInput,
    userId: number | null,
  ): Promise<Application>
  listForUser(userId: number): Promise<ApplicationWithDestination[]>
  listAll(): Promise<ApplicationWithDestination[]>
}

interface ApplicationServiceDependencies {
  applications: ApplicationRepository
  destinations: DestinationRepository
}

export function createApplicationService({
  applications,
  destinations,
}: ApplicationServiceDependencies): ApplicationService {
  return {
    async submit(input, userId) {
      const destination = await destinations.findByCode(input.destinationCode)
      if (!destination) throw new HttpError(404, 'Destination not found')

      return applications.create({
        ...input,
        destinationCode: destination.code,
        userId,
      })
    },

    listForUser: (userId) => applications.findByUserId(userId),

    listAll: () => applications.findAll(),
  }
}
