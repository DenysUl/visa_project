import TextField from '@/components/ui/TextField'
import type { ExtraService } from '@/features/destinations/visaPolicies'
import DocumentUploadField from './DocumentUploadField'
import {
  EXTRA_SERVICE_FEE_USD,
  type ApplicationWizardValues,
} from './types'

interface DocumentsStepProps {
  values: ApplicationWizardValues
  documentLabels: readonly string[]
  extraServices: readonly ExtraService[]
  onChange: (patch: Partial<ApplicationWizardValues>) => void
}

export default function DocumentsStep({
  values,
  documentLabels,
  extraServices,
  onChange,
}: DocumentsStepProps) {
  const setDocument = (label: string, fileName: string | null) => {
    const without = values.documents.filter((doc) => doc.label !== label)
    onChange({
      documents: fileName ? [...without, { label, fileName }] : without,
    })
  }

  const toggleService = (name: string) => {
    const selected = values.extraServices.includes(name)
    onChange({
      extraServices: selected
        ? values.extraServices.filter((item) => item !== name)
        : [...values.extraServices, name],
    })
  }

  const uploadLabels = documentLabels.filter(
    (label) => !/travel dates/i.test(label),
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Passport number"
          required
          value={values.passportNumber}
          onChange={(e) => onChange({ passportNumber: e.target.value })}
          placeholder="As in your passport"
        />
        <TextField
          label="Passport expiry"
          type="date"
          required
          value={values.passportExpiry}
          onChange={(e) => onChange({ passportExpiry: e.target.value })}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {uploadLabels.map((label) => (
          <DocumentUploadField
            key={label}
            label={label}
            fileName={
              values.documents.find((doc) => doc.label === label)?.fileName
            }
            onSelect={(fileName) => setDocument(label, fileName)}
            onClear={() => setDocument(label, null)}
          />
        ))}
      </div>

      {extraServices.length > 0 && (
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wide text-muted">
            Optional before you travel
          </legend>
          <ul className="mt-3 space-y-2">
            {extraServices.map((service) => {
              const checked = values.extraServices.includes(service.name)
              return (
                <li key={service.name}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 hover:border-primary">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleService(service.name)}
                      className="mt-1 size-4 accent-primary"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-ink">
                          {service.name}
                        </span>
                        <span className="text-sm font-bold text-primary">
                          +${EXTRA_SERVICE_FEE_USD}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                        {service.description}
                      </span>
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        </fieldset>
      )}
    </div>
  )
}
