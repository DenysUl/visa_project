import { Lock, MessageCircle, PhoneCall } from 'lucide-react'

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

const columns = [

  {
    title: 'Popular Destinations',
    links: [
      'US eVisa',
      'Schengen eVisa',
      'UAE eVisa',
      'India eVisa',
      'UK ETA',
      'Canada eTA',
    ],
  },
  {
    title: 'Company',
    links: ['About us', 'Blog', 'Contacts', 'Affiliate Program'],
  },
]

const socials = [
  { icon: FacebookIcon, label: 'Facebook' },
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: XIcon, label: 'X (Twitter)' },
]

export default function Footer() {
  return (
    <>
      <footer
        id="contacts"
        className="border-t border-teal-100 bg-teal-50/40 text-slate-700"
      >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-ink">
                Company Name
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Your trusted travel companion. Fast, secure and 100% online.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-lg bg-primary-light text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted transition-colors hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-5 border-t border-slate-200 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:gap-5">
            <span>© 2026 Company Name. All rights reserved.</span>
            <a href="#" className="hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary">
              Terms of Service
            </a>
          </div>

          {/* Payment badges */}
          <div className="flex items-center gap-2.5">
            {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((pay) => (
              <span
                key={pay}
                className="rounded-md bg-primary-light px-3 py-1.5 text-xs font-bold text-primary"
              >
                {pay}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5 rounded-md bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
              <Lock className="size-3.5" />
              Secure payment
            </span>
          </div>
        </div>
      </div>
      </footer>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        <a
          href="#"
          aria-label="Open chat"
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
        >
          <MessageCircle className="size-5" />
        </a>
        <a
          href="tel:+380000000000"
          aria-label="Call us"
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-700 text-white shadow-lg shadow-teal-700/30 transition-colors hover:bg-teal-600"
        >
          <PhoneCall className="size-5" />
        </a>
      </div>
    </>
  )
}
