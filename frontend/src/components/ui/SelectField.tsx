import type { SelectHTMLAttributes } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  label: string
  options: readonly SelectOption[]
  placeholder?: string
}

export default function SelectField({
  label,
  options,
  placeholder = 'Select…',
  ...selectProps
}: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-left text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      <select
        className="h-13 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
        {...selectProps}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
