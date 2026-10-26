import type { Destination } from '@prisma/client'
import { HttpError } from '../../lib/http-error.js'
import type { DestinationRepository } from './destinations.repository.js'

/** `documents` is stored as a JSON-encoded array */
export interface DestinationDto extends Omit<Destination, 'documents'> {
  documents: string[]
}

export interface DestinationService {
  list(): Promise<DestinationDto[]>
  getByCode(code: string): Promise<DestinationDto>
}

interface DestinationServiceDependencies {
  destinations: DestinationRepository
}

function toDestinationDto(destination: Destination): DestinationDto {
  return {
    ...destination,
    documents: JSON.parse(destination.documents) as string[],
  }
}

export function createDestinationService({
  destinations,
}: DestinationServiceDependencies): DestinationService {
  return {
    async list() {
      const rows = await destinations.findAll()
      return rows.map(toDestinationDto)
    },

    async getByCode(code) {
      const destination = await destinations.findByCode(code.toUpperCase())
      if (!destination) throw new HttpError(404, 'Destination not found')
      return toDestinationDto(destination)
    },
  }
}
