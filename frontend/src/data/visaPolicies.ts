export interface VisaPolicy {
  documents: string[]
}

const defaultRequirements: string[] = [
  'Requirement 1',
  'Requirement 2',
  'Requirement 3',
  'Requirement 4',
]

type DestinationPolicyMap = Record<string, VisaPolicy>

const visaPolicies: Record<string, DestinationPolicyMap> = {
  US: {
    UA: { documents: defaultRequirements },
    GB: { documents: defaultRequirements },
    DEFAULT: { documents: defaultRequirements },
  },
  EU: {
    UA: { documents: defaultRequirements },
    US: { documents: defaultRequirements },
    DEFAULT: { documents: defaultRequirements },
  },
  AE: {
    UA: { documents: defaultRequirements },
    US: { documents: defaultRequirements },
    DEFAULT: { documents: defaultRequirements },
  },
  IN: {
    UA: { documents: defaultRequirements },
    GB: { documents: defaultRequirements },
    DEFAULT: { documents: defaultRequirements },
  },
  GB: {
    UA: { documents: defaultRequirements },
    US: { documents: defaultRequirements },
    DEFAULT: { documents: defaultRequirements },
  },
  CA: {
    UA: { documents: defaultRequirements },
    US: { documents: defaultRequirements },
    DEFAULT: { documents: defaultRequirements },
  },
  TR: {
    UA: { documents: defaultRequirements },
    GB: { documents: defaultRequirements },
    DEFAULT: { documents: defaultRequirements },
  },
  JP: {
    UA: { documents: defaultRequirements },
    US: { documents: defaultRequirements },
    DEFAULT: { documents: defaultRequirements },
  },
}

export function resolveVisaPolicy(
  destinationCode: string,
  citizenshipCode?: string | null,
): VisaPolicy {
  const destinationPolicies = visaPolicies[destinationCode.toUpperCase()]

  if (!destinationPolicies) {
    return { documents: defaultRequirements }
  }

  if (citizenshipCode) {
    const specific = destinationPolicies[citizenshipCode.toUpperCase()]
    if (specific) {
      return specific
    }
  }

  return destinationPolicies.DEFAULT ?? { documents: defaultRequirements }
}
