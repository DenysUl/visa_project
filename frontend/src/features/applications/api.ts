import { env } from '@/config/env'
import { apiRequest } from '@/lib/http'
import { localApplicationsApi } from './local-api'
import type {
  Application,
  ApplicationWithDestination,
  NewApplication,
} from './types'

const remoteApplicationsApi = {
  submit(application: NewApplication): Promise<Application> {
    return apiRequest<Application>('/applications', {
      method: 'POST',
      body: application,
    })
  },

  /** Applications of the signed-in user, newest first */
  listMine(): Promise<ApplicationWithDestination[]> {
    return apiRequest<ApplicationWithDestination[]>('/applications/mine')
  },
}

export const applicationsApi = env.useLocalData
  ? localApplicationsApi
  : remoteApplicationsApi
