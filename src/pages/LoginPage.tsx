import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, Loader2, Lock, Mail, User } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'

type Mode = 'login' | 'register'

export default function LoginPage() {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [mode, setMode] = useState<Mode>('login')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const from =
    (location.state as { from?: string } | null)?.from ?? '/account'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      if (mode === 'login') {
        await login(email.trim(), password)
      } else {
        await register(fullName.trim(), email.trim(), password)
      }
      navigate(from, { replace: true })
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

  const switchMode = (m: Mode) => {
    setMode(m)
    setError('')
  }

  return (
    <section className="bg-primary-light/40 py-16 lg:py-24">
      <div className="mx-auto max-w-md px-4 sm:px-6">
        <div className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 sm:p-8">
          {/* Mode tabs */}
          <div className="grid grid-cols-2 rounded-xl bg-primary-light/70 p-1">
            <button
              type="button"
              onClick={() => switchMode('login')}
              className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
                mode === 'login'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-muted hover:text-primary'
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => switchMode('register')}
              className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
                mode === 'register'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-muted hover:text-primary'
              }`}
            >
              Create account
            </button>
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-ink">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {mode === 'login'
              ? 'Sign in to track your applications.'
              : 'Track applications and apply faster next time.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            {mode === 'register' && (
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
                  Full name
                </span>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="h-13 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-muted hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
                  />
                </div>
              </label>
            )}

            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
                Email
              </span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-13 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-muted hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
                Password
              </span>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                  type="password"
                  required
                  minLength={mode === 'register' ? 8 : undefined}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={
                    mode === 'register' ? 'At least 8 characters' : 'Your password'
                  }
                  className="h-13 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-muted hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-base font-bold text-white transition-colors hover:bg-accent-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Please wait…
                </>
              ) : (
                <>
                  {mode === 'login' ? 'Sign in' : 'Create account'}
                  <ArrowRight className="size-5" />
                </>
              )}
            </button>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
