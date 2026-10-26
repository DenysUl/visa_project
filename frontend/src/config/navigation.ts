export interface NavLink {
  label: string
  href: string
}

export interface HeaderNavItem extends NavLink {
  hasDropdown?: boolean
}

export interface FooterLinkGroup {
  title: string
  links: readonly NavLink[]
}

export const headerNavigation: readonly HeaderNavItem[] = [
  { label: 'Requirements by Country', href: '/#destinations' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Contacts', href: '/#contacts' },
]

export const footerNavigation: readonly FooterLinkGroup[] = [
  {
    title: 'Popular Destinations',
    links: [
      { label: 'US eVisa', href: '#' },
      { label: 'Schengen eVisa', href: '#' },
      { label: 'UAE eVisa', href: '#' },
      { label: 'India eVisa', href: '#' },
      { label: 'UK ETA', href: '#' },
      { label: 'Canada eTA', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contacts', href: '#' },
      { label: 'Affiliate Program', href: '#' },
    ],
  },
]

export const legalLinks: readonly NavLink[] = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
]
