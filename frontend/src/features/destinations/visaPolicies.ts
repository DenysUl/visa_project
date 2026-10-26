export interface ExtraService {
  name: string
  description: string
}

export interface VisaPrice {
  amount: string
  note: string
}

export interface VisaPolicy {
  visaType: string
  overview: string
  documents: readonly string[]
  price: VisaPrice
  extraServices: readonly ExtraService[]
}

/** Policies keyed by citizenship code, plus a fallback for everyone else */
type DestinationPolicyMap = Readonly<Record<string, VisaPolicy>>

const DEFAULT_POLICY_KEY = 'DEFAULT'

const placeholderPolicy: VisaPolicy = {
  visaType: 'eVisa / ETA',
  overview:
    'Most travelers need an electronic travel authorization before departure. The outline below is a placeholder until official, nationality-specific content is added. Processing is fully online — no embassy visit required for this product.',
  documents: [
    'Valid passport bio page (scan or photo)',
    'Recent digital passport-style photo',
    'Intended travel dates',
    'Proof of accommodation or host address',
  ],
  price: {
    amount: 'from $79',
    note: 'Visa processing fee charged on this site. Government or embassy fees are not included.',
  },
  extraServices: [
    {
      name: 'Arrival card',
      description:
        'Some destinations require an arrival or landing card before you board or at the border.',
    },
    {
      name: 'Health declaration',
      description:
        'A short health or travel declaration may be required depending on current entry rules.',
    },
  ],
}

/** Keyed by destination code, then by citizenship code */
const visaPolicies: Readonly<Record<string, DestinationPolicyMap>> = {
  US: {
    UA: placeholderPolicy,
    GB: placeholderPolicy,
    [DEFAULT_POLICY_KEY]: placeholderPolicy,
  },
  EU: {
    UA: placeholderPolicy,
    US: placeholderPolicy,
    [DEFAULT_POLICY_KEY]: placeholderPolicy,
  },
  AE: {
    UA: placeholderPolicy,
    US: placeholderPolicy,
    [DEFAULT_POLICY_KEY]: placeholderPolicy,
  },
  IN: {
    UA: placeholderPolicy,
    GB: placeholderPolicy,
    [DEFAULT_POLICY_KEY]: placeholderPolicy,
  },
  GB: {
    UA: placeholderPolicy,
    US: placeholderPolicy,
    [DEFAULT_POLICY_KEY]: placeholderPolicy,
  },
  CA: {
    UA: placeholderPolicy,
    US: placeholderPolicy,
    [DEFAULT_POLICY_KEY]: placeholderPolicy,
  },
  TR: {
    UA: placeholderPolicy,
    GB: placeholderPolicy,
    [DEFAULT_POLICY_KEY]: placeholderPolicy,
  },
  JP: {
    UA: placeholderPolicy,
    US: placeholderPolicy,
    [DEFAULT_POLICY_KEY]: placeholderPolicy,
  },
}

export function resolveVisaPolicy(
  destinationCode: string,
  citizenshipCode?: string | null,
): VisaPolicy {
  const destinationPolicies = visaPolicies[destinationCode.toUpperCase()]
  if (!destinationPolicies) return placeholderPolicy

  const specificPolicy = citizenshipCode
    ? destinationPolicies[citizenshipCode.toUpperCase()]
    : undefined

  return (
    specificPolicy ??
    destinationPolicies[DEFAULT_POLICY_KEY] ??
    placeholderPolicy
  )
}
