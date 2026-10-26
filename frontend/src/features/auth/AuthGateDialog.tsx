import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { routePaths } from '@/config/routes'
import type { AuthPageMode } from './types'

interface AuthGateDialogProps {
  destinationName: string
  citizenshipName?: string
}

export default function AuthGateDialog({
  destinationName,
  citizenshipName,
}: AuthGateDialogProps) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const goToAuth = (mode: AuthPageMode) => {
    navigate(routePaths.login, {
      state: { from: location.pathname, mode },
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-gate-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl shadow-slate-900/20 sm:p-8">
        <span className="grid size-12 place-items-center rounded-2xl bg-primary-light text-primary">
          <Lock className="size-6" />
        </span>
        <h2
          id="auth-gate-title"
          className="mt-4 text-xl font-extrabold tracking-tight text-ink"
        >
          Sign in to view visa requirements
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {citizenshipName
            ? `Create a free account or sign in to see the visa policy, documents and price for ${citizenshipName} citizens traveling to ${destinationName}.`
            : `Create a free account or sign in to see the visa policy, documents and price for ${destinationName}.`}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => goToAuth('login')}
            className="flex-1 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-accent-dark"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => goToAuth('register')}
            className="flex-1 rounded-xl border border-primary px-4 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary-light"
          >
            Create account
          </button>
        </div>
        <Link
          to={routePaths.home}
          className="mt-4 block text-center text-sm font-medium text-muted hover:text-primary"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
