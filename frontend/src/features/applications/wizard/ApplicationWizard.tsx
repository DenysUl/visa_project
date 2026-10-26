import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import ErrorMessage from '@/components/ui/ErrorMessage'
import SubmitButton from '@/components/ui/SubmitButton'
import { routePaths } from '@/config/routes'
import type { User } from '@/features/auth/types'
import type { Country } from '@/features/countries/countries'
import type { Destination } from '@/features/destinations/destinations'
import { resolveVisaPolicy } from '@/features/destinations/visaPolicies'
import { getErrorMessage } from '@/lib/http'
import { applicationsApi } from '../api'
import DocumentsStep from './DocumentsStep'
import PaymentStep from './PaymentStep'
import StepIndicator from './StepIndicator'
import TravelerStep from './TravelerStep'
import TripStep from './TripStep'
import {
  WIZARD_STEPS,
  applicationTotalUsd,
  type ApplicationWizardValues,
  type WizardStepId,
} from './types'

interface ApplicationWizardProps {
  user: User
  destination: Destination
  citizenship: Country
}

const NETWORK_ERROR_MESSAGE =
  'Could not reach the server. Please make sure the backend is running and try again.'

function createInitialValues(user: User): ApplicationWizardValues {
  return {
    fullName: user.fullName,
    email: user.email,
    phone: '',
    dateOfBirth: '',
    countryOfResidence: '',
    streetAddress: '',
    city: '',
    purposeOfVisit: '',
    travelStart: '',
    travelEnd: '',
    destinationAddress: '',
    passportNumber: '',
    passportExpiry: '',
    documents: [],
    extraServices: [],
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  }
}

function hasText(value: string): boolean {
  return value.trim().length > 0
}

function validateStep(
  step: WizardStepId,
  values: ApplicationWizardValues,
  documentLabels: readonly string[],
): string | null {
  if (step === 'traveler') {
    if (
      !hasText(values.fullName) ||
      !hasText(values.email) ||
      !hasText(values.phone) ||
      !hasText(values.dateOfBirth) ||
      !hasText(values.countryOfResidence) ||
      !hasText(values.streetAddress) ||
      !hasText(values.city)
    ) {
      return 'Please fill in all traveler details.'
    }
  }

  if (step === 'trip') {
    if (
      !hasText(values.purposeOfVisit) ||
      !hasText(values.travelStart) ||
      !hasText(values.travelEnd)
    ) {
      return 'Please add the purpose of your trip and travel dates.'
    }
    if (values.travelEnd < values.travelStart) {
      return 'Departure date must be on or after arrival.'
    }
  }

  if (step === 'documents') {
    if (!hasText(values.passportNumber) || !hasText(values.passportExpiry)) {
      return 'Please enter your passport number and expiry date.'
    }
    const requiredUploads = documentLabels.filter(
      (label) => !/travel dates/i.test(label),
    )
    const missing = requiredUploads.some(
      (label) => !values.documents.some((doc) => doc.label === label),
    )
    if (missing) return 'Please upload every required document.'
  }

  if (step === 'payment') {
    if (!hasText(values.paymentMethod)) {
      return 'Please choose a payment method.'
    }
    if (values.paymentMethod === 'card') {
      if (
        !hasText(values.cardNumber) ||
        !hasText(values.cardExpiry) ||
        !hasText(values.cardCvc)
      ) {
        return 'Please enter your card details.'
      }
    }
  }

  return null
}

export default function ApplicationWizard({
  user,
  destination,
  citizenship,
}: ApplicationWizardProps) {
  const policy = resolveVisaPolicy(destination.code, citizenship.code)
  const [step, setStep] = useState<WizardStepId>('traveler')
  const [values, setValues] = useState<ApplicationWizardValues>(() =>
    createInitialValues(user),
  )
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  const stepIndex = WIZARD_STEPS.findIndex((item) => item.id === step)
  const isLast = step === 'payment'
  const total = applicationTotalUsd(values)

  const patchValues = (patch: Partial<ApplicationWizardValues>) => {
    setValues((current) => ({ ...current, ...patch }))
    setError('')
  }

  const goBack = () => {
    if (stepIndex <= 0) return
    setError('')
    setStep(WIZARD_STEPS[stepIndex - 1].id)
  }

  const goNext = () => {
    const message = validateStep(step, values, policy.documents)
    if (message) {
      setError(message)
      return
    }
    if (stepIndex >= WIZARD_STEPS.length - 1) return
    setError('')
    setStep(WIZARD_STEPS[stepIndex + 1].id)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!isLast) {
      goNext()
      return
    }

    const message = validateStep(step, values, policy.documents)
    if (message) {
      setError(message)
      return
    }

    setSubmitting(true)
    setError('')
    try {
      await applicationsApi.submit({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        citizenship: citizenship.name,
        destinationCode: destination.code,
        details: {
          phone: values.phone.trim(),
          dateOfBirth: values.dateOfBirth,
          countryOfResidence: values.countryOfResidence,
          streetAddress: values.streetAddress.trim(),
          city: values.city.trim(),
          purposeOfVisit: values.purposeOfVisit,
          travelStart: values.travelStart,
          travelEnd: values.travelEnd,
          destinationAddress: values.destinationAddress.trim(),
          passportNumber: values.passportNumber.trim(),
          passportExpiry: values.passportExpiry,
          documents: values.documents,
          extraServices: values.extraServices,
          paymentMethod: values.paymentMethod,
          amountUsd: total,
        },
      })
      setSubmitted(true)
    } catch (err) {
      setError(getErrorMessage(err, NETWORK_ERROR_MESSAGE))
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-100">
          <CheckCircle2 className="size-8 text-emerald-600" />
        </span>
        <h2 className="mt-4 text-2xl font-extrabold text-ink">
          Application received
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          We have started processing your eVisa for {destination.name}. A
          confirmation was sent to {values.email}. Our team will review your
          documents and follow up if anything is missing.
        </p>
        <Link
          to={routePaths.account}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white hover:bg-accent-dark"
        >
          View my applications
          <ArrowRight className="size-4" />
        </Link>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 sm:p-8"
    >
      <StepIndicator current={step} />

      <h2 className="mt-8 text-xl font-extrabold text-ink">
        {step === 'traveler' && 'Traveler details'}
        {step === 'trip' && 'Trip details'}
        {step === 'documents' && 'Passport and documents'}
        {step === 'payment' && 'Review and pay'}
      </h2>
      <p className="mt-1 text-sm text-muted">
        {step === 'traveler' &&
          'Use the same personal data as in your passport.'}
        {step === 'trip' && `Tell us about your visit to ${destination.name}.`}
        {step === 'documents' &&
          'Upload clear scans. Photos and PDFs are accepted.'}
        {step === 'payment' &&
          `Pay the processing fee to submit your application.`}
      </p>

      <div className="mt-6">
        {step === 'traveler' && (
          <TravelerStep values={values} onChange={patchValues} />
        )}
        {step === 'trip' && (
          <TripStep
            values={values}
            destinationName={destination.name}
            onChange={patchValues}
          />
        )}
        {step === 'documents' && (
          <DocumentsStep
            values={values}
            documentLabels={policy.documents}
            extraServices={policy.extraServices}
            onChange={patchValues}
          />
        )}
        {step === 'payment' && (
          <PaymentStep
            values={values}
            destinationName={destination.name}
            citizenshipName={citizenship.name}
            onChange={patchValues}
          />
        )}
      </div>

      {error && <ErrorMessage className="mt-5">{error}</ErrorMessage>}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        {stepIndex > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
        ) : (
          <span />
        )}

        {isLast ? (
          <div className="sm:min-w-56">
            <SubmitButton isLoading={submitting} loadingLabel="Paying…">
              Pay ${total}
              <ArrowRight className="size-5" />
            </SubmitButton>
          </div>
        ) : (
          <button
            type="submit"
            className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-bold text-white hover:bg-accent-dark"
          >
            Continue
            <ArrowRight className="size-4" />
          </button>
        )}
      </div>
    </form>
  )
}
