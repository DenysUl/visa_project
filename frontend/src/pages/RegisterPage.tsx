import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await register(fullName.trim(), email.trim(), password)
      navigate('/account')
    } catch (err) {
      setError(
        err instanceof Error && err.message !== 'Failed to fetch'
          ? err.message
          : 'Could not reach the server. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-gradient-to-b from-primary-light via-primary-light/60 to-white py-16 lg:py-24">
      <div className="mx-auto max-w-md px-4 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 sm:p-8"
        >
          <h1 className="text-2xl font-extrabold text-ink">
            Create an account
          </h1>
          <p className="mt-1 text-sm text-muted">
            Track your applications and apply faster next time.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
                Full name
              </span>
              <input
                type="text"
                required
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="As shown in your passport"
                className="h-13 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition-colors placeholder:text-muted hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
                Email
              </span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-13 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition-colors placeholder:text-muted hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
                Password
              </span>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="h-13 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition-colors placeholder:text-muted hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-base font-bold text-white transition-colors hover:bg-accent-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  Sign up
                  <ArrowRight className="size-5" />
                </>
              )}
            </button>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}
