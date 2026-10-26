import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  CircleUser,
  FileText,
  Loader2,
  LogOut,
} from 'lucide-react'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Flag from '@/components/ui/Flag'
import { routePaths } from '@/config/routes'
import ApplicationStatusBadge from '@/features/applications/ApplicationStatusBadge'
import { applicationsApi } from '@/features/applications/api'
import type { ApplicationWithDestination } from '@/features/applications/types'
import { useAuth } from '@/features/auth/useAuth'

const LOAD_ERROR_MESSAGE =
  'Could not load your applications. Please try again later.'

const submittedDateFormat: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}

export default function AccountPage() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()
  const [applications, setApplications] = useState<
    ApplicationWithDestination[] | null
  >(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      navigate(routePaths.login, {
        replace: true,
        state: { from: routePaths.account },
      })
    }
  }, [loading, user, navigate])

  useEffect(() => {
    if (!user) return
    applicationsApi
      .listMine()
      .then(setApplications)
      .catch(() => setError(LOAD_ERROR_MESSAGE))
  }, [user])

  const handleLogout = async () => {
    await logout()
    navigate(routePaths.home)
  }

  if (loading || !user) {
    return (
      <div className="grid min-h-96 place-items-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <section className="bg-primary-light/40 py-14 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Profile card */}
        <div className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-full bg-primary-light">
              <CircleUser className="size-8 text-primary" />
            </span>
            <div>
              <h1 className="text-xl font-extrabold text-ink sm:text-2xl">
                {user.fullName}
              </h1>
              <p className="text-sm text-muted">{user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>

        {/* Applications */}
        <h2 className="mt-10 flex items-center gap-2 text-lg font-bold text-ink">
          <FileText className="size-5 text-primary" />
          My applications
        </h2>

        {error && <ErrorMessage className="mt-4">{error}</ErrorMessage>}

        {!error && applications === null && (
          <div className="mt-6 grid place-items-center rounded-2xl bg-white py-12 ring-1 ring-slate-900/5">
            <Loader2 className="size-6 animate-spin text-primary" />
          </div>
        )}

        {applications !== null && applications.length === 0 && (
          <div className="mt-6 rounded-2xl bg-white p-8 text-center ring-1 ring-slate-900/5">
            <p className="text-sm text-muted">
              You don&apos;t have any applications yet.
            </p>
            <Link
              to="/#destinations"
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Browse destinations
              <ArrowRight className="size-4" />
            </Link>
          </div>
        )}

        {applications !== null && applications.length > 0 && (
          <ul className="mt-6 space-y-3">
            {applications.map((a) => (
              <li
                key={a.id}
                className="flex flex-col gap-3 rounded-2xl bg-white p-5 ring-1 ring-slate-900/5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <Flag code={a.destination.code} className="text-2xl" />
                  <div>
                    <p className="text-sm font-bold text-ink">
                      {a.destination.name}
                    </p>
                    <p className="text-xs text-muted">
                      Submitted{' '}
                      {new Date(a.createdAt).toLocaleDateString(
                        'en-GB',
                        submittedDateFormat,
                      )}
                    </p>
                  </div>
                </div>
                <ApplicationStatusBadge status={a.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
