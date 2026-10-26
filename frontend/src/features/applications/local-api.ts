import { getDestination } from '@/features/destinations/destinations'
import { getLocalSessionUserId } from '@/features/auth/local-api'
import { ApiError } from '@/lib/http'
import { localStore } from '@/lib/local-store'
import type {
  Application,
  ApplicationWithDestination,
  NewApplication,
} from './types'

const APPLICATIONS_KEY = 'visa.local.applications'

function loadApplications(): ApplicationWithDestination[] {
  return localStore.get<ApplicationWithDestination[]>(APPLICATIONS_KEY, [])
}

function saveApplications(applications: ApplicationWithDestination[]): void {
  localStore.set(APPLICATIONS_KEY, applications)
}

export const localApplicationsApi = {
  async submit(application: NewApplication): Promise<Application> {
    const destination = getDestination(application.destinationCode)
    if (!destination) {
      throw new ApiError('Destination not found', 'http', 404)
    }

    const applications = loadApplications()
    const created: ApplicationWithDestination = {
      ...application,
      id: (applications[0]?.id ?? 0) + 1,
      status: 'pending',
      createdAt: new Date().toISOString(),
      userId: getLocalSessionUserId(),
      destination: { name: destination.name, code: destination.code },
    }
    saveApplications([created, ...applications])
    return created
  },

  async listMine(): Promise<ApplicationWithDestination[]> {
    const userId = getLocalSessionUserId()
    if (userId === null) {
      throw new ApiError('Unauthorized', 'http', 401)
    }
    return loadApplications().filter((item) => item.userId === userId)
  },
}
