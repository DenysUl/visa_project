import { useEffect, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Послуги', href: '#services', hasDropdown: true },
  { label: 'Вимоги за країнами', href: '#destinations' },
  { label: 'Блог', href: '#blog' },
  { label: 'Контакти', href: '#contacts' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? 'shadow-md shadow-slate-900/5' : ''
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight text-ink">
            Visa
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-primary-light hover:text-primary"
            >
              {item.label}
              {item.hasDropdown && <ChevronDown className="size-4" />}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            className="flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-primary-light hover:text-primary"
          >
            UA <ChevronDown className="size-3.5" />
          </button>
          <button
            type="button"
            className="flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-primary-light hover:text-primary"
          >
            UAH <ChevronDown className="size-3.5" />
          </button>
          <a
            href="#login"
            className="px-2 text-sm font-semibold text-slate-700 transition-colors hover:text-primary"
          >
            Увійти
          </a>
          <a
            href="#account"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Мій акаунт
          </a>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'}
          onClick={() => setMenuOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-lg text-slate-700 hover:bg-primary-light lg:hidden"
        >
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-primary-light hover:text-primary"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="size-4" />}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600"
            >
              UA <ChevronDown className="size-3.5" />
            </button>
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600"
            >
              UAH <ChevronDown className="size-3.5" />
            </button>
          </div>
          <div className="mt-4 flex gap-3">
            <a
              href="#login"
              className="flex-1 rounded-xl border border-primary px-4 py-2.5 text-center text-sm font-semibold text-primary"
            >
              Увійти
            </a>
            <a
              href="#account"
              className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Мій акаунт
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
