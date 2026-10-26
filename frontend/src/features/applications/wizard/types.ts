export const PURPOSE_OPTIONS = [
  { value: 'tourism', label: 'Tourism / holiday' },
  { value: 'business', label: 'Business' },
  { value: 'family', label: 'Visiting family or friends' },
  { value: 'transit', label: 'Transit' },
  { value: 'study', label: 'Study' },
] as const

export const PAYMENT_METHODS = [
  { value: 'card', label: 'Credit or debit card' },
  { value: 'apple-pay', label: 'Apple Pay' },
  { value: 'paypal', label: 'PayPal' },
] as const

export const APPLICATION_FEE_USD = 79
export const EXTRA_SERVICE_FEE_USD = 12

export function applicationTotalUsd(values: {
  extraServices: readonly string[]
}): number {
  return APPLICATION_FEE_USD + values.extraServices.length * EXTRA_SERVICE_FEE_USD
}

export interface UploadedDocument {
  label: string
  fileName: string
}

export interface ApplicationWizardValues {
  fullName: string
  email: string
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
  documents: UploadedDocument[]
  extraServices: string[]
  paymentMethod: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string
}

export type WizardStepId = 'traveler' | 'trip' | 'documents' | 'payment'

export const WIZARD_STEPS: readonly { id: WizardStepId; label: string }[] = [
  { id: 'traveler', label: 'You' },
  { id: 'trip', label: 'Trip' },
  { id: 'documents', label: 'Documents' },
  { id: 'payment', label: 'Pay' },
]
