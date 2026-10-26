import type { ComponentType } from 'react'
import type { SocialNetwork } from '@/config/site'

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M13.5 21.9v-8.4h2.8l.5-3.3h-3.3V8.1c0-1 .3-1.6 1.7-1.6h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.4v3.3h2.8v8.4h3.3z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M18.2 2.5h3.3l-7.2 8.2 8.5 11.2h-6.7l-5.2-6.8-6 6.8H1.6l7.7-8.8L1.2 2.5H8l4.7 6.2 5.5-6.2zm-1.2 17.4h1.8L7.1 4.4H5.1l11.9 15.5z" />
    </svg>
  )
}

const iconsByNetwork: Record<SocialNetwork, ComponentType> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  x: XIcon,
}

export default function SocialIcon({ network }: { network: SocialNetwork }) {
  const Icon = iconsByNetwork[network]
  return <Icon />
}
