import { CreditCard } from 'lucide-react'
import SelectField from '@/components/ui/SelectField'
import TextField from '@/components/ui/TextField'
import {
  APPLICATION_FEE_USD,
  EXTRA_SERVICE_FEE_USD,
  PAYMENT_METHODS,
  type ApplicationWizardValues,
} from './types'

interface PaymentStepProps {
  values: ApplicationWizardValues
  destinationName: string
  citizenshipName: string
  onChange: (patch: Partial<ApplicationWizardValues>) => void
}

export default function PaymentStep({
  values,
  destinationName,
  citizenshipName,
  onChange,
}: PaymentStepProps) {
  const extrasTotal = values.extraServices.length * EXTRA_SERVICE_FEE_USD
  const total = APPLICATION_FEE_USD + extrasTotal
  const payByCard = values.paymentMethod === 'card'

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl bg-primary-light/70 p-5">
        <p className="text-sm font-semibold text-ink">
          {citizenshipName} → {destinationName}
        </p>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Visa processing on this site</dt>
            <dd className="font-semibold text-ink">${APPLICATION_FEE_USD}</dd>
          </div>
          {values.extraServices.map((name) => (
            <div key={name} className="flex justify-between gap-4">
              <dt className="text-muted">{name}</dt>
              <dd className="font-semibold text-ink">${EXTRA_SERVICE_FEE_USD}</dd>
            </div>
          ))}
          {extrasTotal > 0 && (
            <div className="flex justify-between gap-4 border-t border-primary/20 pt-2">
              <dt className="text-muted">Extras</dt>
              <dd className="font-semibold text-ink">${extrasTotal}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4 border-t border-primary/20 pt-2">
            <dt className="font-bold text-ink">Total</dt>
            <dd className="text-lg font-extrabold text-ink">${total}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Government or embassy fees are not included.
        </p>
      </div>

      <SelectField
        label="Payment method"
        required
        value={values.paymentMethod}
        onChange={(e) => onChange({ paymentMethod: e.target.value })}
        options={PAYMENT_METHODS}
        placeholder="Choose how to pay"
      />

      {payByCard && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <TextField
              label="Card number"
              required
              inputMode="numeric"
              autoComplete="cc-number"
              icon={CreditCard}
              value={values.cardNumber}
              onChange={(e) => onChange({ cardNumber: e.target.value })}
              placeholder="ACCT-000015"
            />
          </div>
          <TextField
            label="Expiry"
            required
            autoComplete="cc-exp"
            value={values.cardExpiry}
            onChange={(e) => onChange({ cardExpiry: e.target.value })}
            placeholder="MM/YY"
          />
          <TextField
            label="CVC"
            required
            inputMode="numeric"
            autoComplete="cc-csc"
            value={values.cardCvc}
            onChange={(e) => onChange({ cardCvc: e.target.value })}
            placeholder="123"
          />
        </div>
      )}
    </div>
  )
}
