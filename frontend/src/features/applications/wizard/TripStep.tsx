import SelectField from '@/components/ui/SelectField'
import TextField from '@/components/ui/TextField'
import { PURPOSE_OPTIONS, type ApplicationWizardValues } from './types'

interface TripStepProps {
  values: ApplicationWizardValues
  destinationName: string
  onChange: (patch: Partial<ApplicationWizardValues>) => void
}

export default function TripStep({
  values,
  destinationName,
  onChange,
}: TripStepProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <SelectField
          label="Purpose of visit"
          required
          value={values.purposeOfVisit}
          onChange={(e) => onChange({ purposeOfVisit: e.target.value })}
          options={PURPOSE_OPTIONS}
          placeholder="Select purpose"
        />
      </div>
      <TextField
        label="Arrival date"
        type="date"
        required
        value={values.travelStart}
        onChange={(e) => onChange({ travelStart: e.target.value })}
      />
      <TextField
        label="Departure date"
        type="date"
        required
        min={values.travelStart || undefined}
        value={values.travelEnd}
        onChange={(e) => onChange({ travelEnd: e.target.value })}
      />
      <div className="sm:col-span-2">
        <TextField
          label={`Address in ${destinationName} (optional)`}
          value={values.destinationAddress}
          onChange={(e) => onChange({ destinationAddress: e.target.value })}
          placeholder="Hotel, host or other address"
        />
      </div>
    </div>
  )
}
