import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import Flag from '@/components/ui/Flag'
import { countries, type Country } from './countries'

interface CountrySelectProps {
  label: string
  placeholder: string
  value: Country | null
  onChange: (country: Country) => void
}

export default function CountrySelect({
  label,
  placeholder,
  value,
  onChange,
}: CountrySelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return countries
    return countries.filter((c) => c.name.toLowerCase().includes(q))
  }, [query])

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      inputRef.current?.focus()
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative w-full">
      <span className="mb-1 block text-left text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-13 w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition-colors hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        {value ? (
          <span className="flex items-center gap-2 truncate text-sm font-medium text-ink">
            <Flag code={value.code} className="text-base" />
            <span className="truncate">{value.name}</span>
          </span>
        ) : (
          <span className="truncate text-sm text-muted">{placeholder}</span>
        )}
        <ChevronDown
          className={`size-4 shrink-0 text-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
            <Search className="size-4 shrink-0 text-muted" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country…"
              className="w-full bg-transparent py-1 text-sm text-ink outline-none placeholder:text-muted"
            />
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-muted">
                No results found
              </li>
            )}
            {filtered.map((country) => (
              <li key={country.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={value?.code === country.code}
                  onClick={() => {
                    onChange(country)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors hover:bg-primary-light ${
                    value?.code === country.code
                      ? 'bg-primary-light font-semibold text-primary'
                      : 'text-ink'
                  }`}
                >
                  <Flag code={country.code} className="text-base" />
                  {country.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
