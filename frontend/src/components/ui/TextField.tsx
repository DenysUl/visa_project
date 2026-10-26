import type { ComponentType, InputHTMLAttributes } from 'react'

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string
  /** Optional leading icon, e.g. a lucide-react icon */
  icon?: ComponentType<{ className?: string }>
}

const inputBaseClass =
  'h-13 w-full rounded-xl border border-slate-200 bg-white text-sm text-ink outline-none transition-colors placeholder:text-muted hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40'

export default function TextField({
  label,
  icon: Icon,
  ...inputProps
}: TextFieldProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-left text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      {Icon ? (
        <div className="relative">
          <Icon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input className={`${inputBaseClass} pl-11 pr-4`} {...inputProps} />
        </div>
      ) : (
        <input className={`${inputBaseClass} px-4`} {...inputProps} />
      )}
    </label>
  )
}
