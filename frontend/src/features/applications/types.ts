export interface ApplicationDetailsPayload {
  phone: string
  dateOfBirth: string
  countryOfResidence: string
  streetAddress: string
  city: string
  purposeOfVisit: string
  travelStart: string
  travelEnd: string
  destinationAddress: string
  passportNumber: string
  passportExpiry: string
  documents: { label: string; fileName: string }[]
  extraServices: string[]
  paymentMethod: string
  amountUsd: number
}

export interface NewApplication {
  fullName: string
  email: string
  /** Citizenship country name, as shown to the user */
  citizenship: string
  destinationCode: string
  details?: ApplicationDetailsPayload
}

export interface Application extends NewApplication {
  id: number
  status: string
  createdAt: string
  userId: number | null
}

export interface ApplicationWithDestination extends Application {
  destination: { name: string; code: string }
}
