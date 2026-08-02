import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import CountrySelect from './CountrySelect'
import { useAuth } from '../auth/AuthContext'
import { countries, type Country } from '../data/countries'
import type { Destination } from '../data/destinations'

interface ApplicationFormProps {
  destination: Destination
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const defaultCitizenship =
  countries.find((c) => c.code === 'UA') ?? countries[0]

export default function ApplicationForm({
  destination,
}: ApplicationFormProps) {
  const { user } = useAuth()
  const [fullName, setFullName] = useState(user?.fullName ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [citizenship, setCitizenship] = useState<Country | null>(
    defaultCitizenship,
  )
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!fullName.trim() || !email.trim() || !citizenship) return

    setStatus('submitting')
    setError('')
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          citizenship: citizenship.name,
          destinationCode: destination.code,
        }),
      })
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string
        } | null
        throw new Error(body?.error ?? `Request failed (${res.status})`)
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(
        err instanceof Error && err.message !== 'Failed to fetch'
          ? err.message
          : 'Could not reach the server. Please make sure the backend is running and try again.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-100">
          <CheckCircle2 className="size-8 text-emerald-600" />
        </span>
        <h3 className="mt-4 text-xl font-extrabold text-ink">
          Application received!
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We&apos;ve started processing your application for{' '}
          {destination.name}. Check your inbox — our team will contact you
          shortly with the next steps.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 sm:p-7"
    >
      <h3 className="text-xl font-extrabold text-ink">Start your application</h3>
      <p className="mt-1 text-sm text-muted">
        Takes just a few minutes to complete.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <label className="block">
          <span className="mb-1 block text-left text-xs font-semibold uppercase tracking-wide text-muted">
            Full name
          </span>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="As shown in your passport"
            className="h-13 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition-colors placeholder:text-muted hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-left text-xs font-semibold uppercase tracking-wide text-muted">
            Email
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-13 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition-colors placeholder:text-muted hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
          />
        </label>

        <CountrySelect
          label="I am a citizen of"
          placeholder="Select your citizenship"
          value={citizenship}
          onChange={setCitizenship}
        />

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-base font-bold text-white transition-colors hover:bg-accent-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              Apply now
              <ArrowRight className="size-5" />
            </>
          )}
        </button>

        {status === 'error' && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <p className="text-center text-xs text-muted">
          Your data is protected and used only for this application.
        </p>
      </div>
    </form>
  )
}
