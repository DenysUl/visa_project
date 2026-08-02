import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  CircleUser,
  FileText,
  Loader2,
  LogOut,
} from 'lucide-react'
import Flag from '../components/Flag'
import { useAuth } from '../auth/AuthContext'

interface ApplicationRow {
  id: number
  fullName: string
  email: string
  citizenship: string
  status: string
  createdAt: string
  destination: { name: string; code: string }
}

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
}

export default function AccountPage() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()
  const [applications, setApplications] = useState<ApplicationRow[] | null>(
    null,
  )
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true, state: { from: '/account' } })
    }
  }, [loading, user, navigate])

  useEffect(() => {
    if (!user) return
    fetch('/api/applications/mine', { credentials: 'include' })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`)
        setApplications((await res.json()) as ApplicationRow[])
      })
      .catch(() =>
        setError('Could not load your applications. Please try again later.'),
      )
  }, [user])

  const handleLogout = async () => {
    await logout()
    navigate('/')
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

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

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
                      {new Date(a.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${
                    statusStyles[a.status] ?? 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {a.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
