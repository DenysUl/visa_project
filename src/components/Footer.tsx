import { Lock } from 'lucide-react'

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
    title: 'Послуги',
    links: [
      'Візи',
      'Паспорти',
      'Туристичні декларації',
      'Фото на документи',
    ],
  },
  {
    title: 'Популярні напрямки',
    links: [
      'Віза в США',
      'Шенгенська віза',
      'Віза в ОАЕ',
      'Віза в Індію',
      'ETA Великобританія',
      'eTA Канада',
    ],
  },
  {
    title: 'Компанія',
    links: ['Про нас', 'Блог', 'Контакти', 'Партнерська програма'],
  },
]

const socials = [
  { icon: FacebookIcon, label: 'Facebook' },
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: XIcon, label: 'X (Twitter)' },
]

export default function Footer() {
  return (
    <footer id="contacts" className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2">
              
              <span className="text-xl font-extrabold tracking-tight text-white">
                Visa
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Ваш надійний помічник у подорожах. Візи, паспорти та туристичні
              декларації — швидко, безпечно та 100% онлайн.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-lg bg-slate-800 text-slate-300 transition-colors hover:bg-primary hover:text-white"
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 transition-colors hover:text-white"
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
        <div className="mt-12 flex flex-col gap-5 border-t border-slate-800 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:items-center sm:gap-5">
            <span>© 2026 Visa. Усі права захищено.</span>
            <a href="#" className="hover:text-white">
              Політика конфіденційності
            </a>
            <a href="#" className="hover:text-white">
              Умови використання
            </a>
          </div>

          {/* Payment badges */}
          <div className="flex items-center gap-2.5">
            {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((pay) => (
              <span
                key={pay}
                className="rounded-md bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-200"
              >
                {pay}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-900/60 px-3 py-1.5 text-xs font-bold text-emerald-300">
              <Lock className="size-3.5" />
              Безпечна оплата
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
