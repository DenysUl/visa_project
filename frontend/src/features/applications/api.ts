import { apiRequest } from '@/lib/http'
import type {
  Application,
  ApplicationWithDestination,
  NewApplication,
} from './types'

export const applicationsApi = {
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
