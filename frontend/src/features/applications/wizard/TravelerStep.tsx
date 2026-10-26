import TextField from '@/components/ui/TextField'
import CountrySelect from '@/features/countries/CountrySelect'
import { findCountryByCode, type Country } from '@/features/countries/countries'
import type { ApplicationWizardValues } from './types'

interface TravelerStepProps {
  values: ApplicationWizardValues
  onChange: (patch: Partial<ApplicationWizardValues>) => void
}

export default function TravelerStep({ values, onChange }: TravelerStepProps) {
  const residence: Country | null = values.countryOfResidence
    ? (findCountryByCode(values.countryOfResidence) ?? null)
    : null

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <TextField
          label="Full name"
          required
          value={values.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
          placeholder="As shown in your passport"
        />
      </div>
      <TextField
        label="Email"
        type="email"
        required
        value={values.email}
        onChange={(e) => onChange({ email: e.target.value })}
        placeholder="you@example.com"
      />
      <TextField
        label="Phone number"
        type="tel"
        required
        value={values.phone}
        onChange={(e) => onChange({ phone: e.target.value })}
        placeholder="+380…"
      />
      <TextField
        label="Date of birth"
        type="date"
        required
        value={values.dateOfBirth}
        onChange={(e) => onChange({ dateOfBirth: e.target.value })}
      />
      <CountrySelect
        label="Country of residence"
        placeholder="Select country"
        value={residence}
        onChange={(country) =>
          onChange({ countryOfResidence: country?.code ?? '' })
        }
      />
      <div className="sm:col-span-2">
        <TextField
          label="Street address"
          required
          value={values.streetAddress}
          onChange={(e) => onChange({ streetAddress: e.target.value })}
          placeholder="Street and number"
        />
      </div>
      <TextField
        label="Town or city"
        required
        value={values.city}
        onChange={(e) => onChange({ city: e.target.value })}
        placeholder="City"
      />
    </div>
  )
}
