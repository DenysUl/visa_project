export type SocialNetwork = 'facebook' | 'instagram' | 'x'

export interface SocialLink {
  network: SocialNetwork
  label: string
  href: string
}

export interface SiteConfig {
  name: string
  tagline: string
  /** ISO 3166-1 alpha-2 code preselected in citizenship pickers */
  defaultCitizenshipCode: string
  contact: {
    phone: string
    chatUrl: string
  }
  socials: readonly SocialLink[]
  paymentMethods: readonly string[]
}

export const siteConfig: SiteConfig = {
  name: 'Company Name',
  tagline: 'Your trusted travel companion. Fast, secure and 100% online.',
  defaultCitizenshipCode: 'UA',
  contact: {
    phone: '+380000000000',
    chatUrl: '#',
  },
  socials: [
    { network: 'facebook', label: 'Facebook', href: '#' },
    { network: 'instagram', label: 'Instagram', href: '#' },
    { network: 'x', label: 'X (Twitter)', href: '#' },
  ],
  paymentMethods: ['Visa', 'Mastercard', 'PayPal', 'Apple Pay'],
}
