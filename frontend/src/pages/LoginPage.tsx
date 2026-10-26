import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, Lock, Mail, User } from 'lucide-react'
import ErrorMessage from '@/components/ui/ErrorMessage'
import SubmitButton from '@/components/ui/SubmitButton'
import TextField from '@/components/ui/TextField'
import { routePaths } from '@/config/routes'
import { useAuth } from '@/features/auth/useAuth'
import type { AuthLocationState, AuthPageMode } from '@/features/auth/types'
import { getErrorMessage } from '@/lib/http'

const MIN_PASSWORD_LENGTH = 8
const NETWORK_ERROR_MESSAGE = 'Could not reach the server. Please try again.'

export default function LoginPage() {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const authState = location.state as AuthLocationState | null
  const [mode, setMode] = useState<AuthPageMode>(authState?.mode ?? 'login')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const redirectTo = authState?.from ?? routePaths.account
  const fromRequirements = Boolean(
    authState?.from?.startsWith('/destinations/'),
  )

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
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(getErrorMessage(err, NETWORK_ERROR_MESSAGE))
    } finally {
      setSubmitting(false)
    }
  }

  const switchMode = (nextMode: AuthPageMode) => {
    setMode(nextMode)
    setError('')
  }

  return (
    <section className="bg-primary-light/40 py-16 lg:py-24">
      <div className="mx-auto max-w-md px-4 sm:px-6">
        <div className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 sm:p-8">
          {/* Mode tabs */}
          <div className="grid grid-cols-2 rounded-xl bg-primary-light/70 p-1">
            <ModeTab active={mode === 'login'} onClick={() => switchMode('login')}>
              Sign in
            </ModeTab>
            <ModeTab
              active={mode === 'register'}
              onClick={() => switchMode('register')}
            >
              Create account
            </ModeTab>
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-ink">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {fromRequirements
              ? 'Sign in to see the visa policy, documents and price for your trip.'
              : mode === 'login'
                ? 'Sign in to track your applications.'
                : 'Track applications and apply faster next time.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            {mode === 'register' && (
              <TextField
                label="Full name"
                icon={User}
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
              />
            )}

            <TextField
              label="Email"
              icon={Mail}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            <TextField
              label="Password"
              icon={Lock}
              type="password"
              required
              minLength={mode === 'register' ? MIN_PASSWORD_LENGTH : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                mode === 'register'
                  ? `At least ${MIN_PASSWORD_LENGTH} characters`
                  : 'Your password'
              }
            />

            <SubmitButton isLoading={submitting} loadingLabel="Please wait…">
              {mode === 'login' ? 'Sign in' : 'Create account'}
              <ArrowRight className="size-5" />
            </SubmitButton>

            {error && <ErrorMessage>{error}</ErrorMessage>}
          </form>
        </div>
      </div>
    </section>
  )
}

interface ModeTabProps {
  active: boolean
  onClick: () => void
  children: string
}

function ModeTab({ active, onClick, children }: ModeTabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
        active ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-primary'
      }`}
    >
      {children}
    </button>
  )
}
