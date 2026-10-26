import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { footerNavigation, legalLinks } from '@/config/navigation'
import { routePaths } from '@/config/routes'
import { siteConfig } from '@/config/site'
import SocialIcon from './SocialIcon'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      id="contacts"
      className="border-t border-teal-100 bg-teal-50/40 text-slate-700"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to={routePaths.home} className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-ink">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.tagline}
            </p>
            <div className="mt-5 flex gap-3">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.network}
                  href={social.href}
                  aria-label={social.label}
                  className="grid size-10 place-items-center rounded-lg bg-primary-light text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  <SocialIcon network={social.network} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerNavigation.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
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
            <span>
              © {currentYear} {siteConfig.name}. All rights reserved.
            </span>
            {legalLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-primary">
                {link.label}
              </a>
            ))}
          </div>

          {/* Payment badges */}
          <div className="flex items-center gap-2.5">
            {siteConfig.paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded-md bg-primary-light px-3 py-1.5 text-xs font-bold text-primary"
              >
                {method}
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
  )
}
