export const routePaths = {
  home: '/',
  login: '/login',
  account: '/account',
  destination: '/destinations/:code',
  destinationForCitizenship: '/destinations/:code/:citizenshipCode',
  destinationApply: '/destinations/:code/:citizenshipCode/apply',
} as const

export function buildDestinationPath(
  destinationCode: string,
  citizenshipCode?: string,
): string {
  const destinationPath = `/destinations/${destinationCode.toLowerCase()}`
  return citizenshipCode
    ? `${destinationPath}/${citizenshipCode.toLowerCase()}`
    : destinationPath
}

export function buildApplicationPath(
  destinationCode: string,
  citizenshipCode: string,
): string {
  return `${buildDestinationPath(destinationCode, citizenshipCode)}/apply`
}
