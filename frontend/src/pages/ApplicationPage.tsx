import { useEffect } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Flag from '@/components/ui/Flag'
import { buildDestinationPath, routePaths } from '@/config/routes'
import ApplicationWizard from '@/features/applications/wizard/ApplicationWizard'
import { useAuth } from '@/features/auth/useAuth'
import { findCountryByCode } from '@/features/countries/countries'
import { getDestination } from '@/features/destinations/destinations'

type ApplicationRouteParams = {
  code: string
  citizenshipCode: string
}

export default function ApplicationPage() {
  const { code, citizenshipCode } = useParams<ApplicationRouteParams>()
  const location = useLocation()
  const { user, loading } = useAuth()
  const destination = code ? getDestination(code) : undefined
  const citizenship = citizenshipCode
    ? findCountryByCode(citizenshipCode)
    : undefined

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [code, citizenshipCode])

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center text-sm text-muted">
        Loading your session…
      </div>
    )
  }

  if (!user) {
    return (
      <Navigate
        to={routePaths.login}
        replace
        state={{ from: location.pathname, mode: 'login' }}
      />
    )
  }

  if (!destination || !citizenship) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold text-ink">
          Application not available
        </h1>
        <p className="mt-3 text-muted">
          We could not open this application. Please start from the destination
          page.
        </p>
        <Link
          to={routePaths.home}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <>
      <section className="border-b border-slate-100 bg-primary-light/50">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            to={buildDestinationPath(destination.code, citizenship.code)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark"
          >
            <ArrowLeft className="size-4" />
            Back to visa policy
          </Link>
          <div className="mt-4 flex items-center gap-3">
            <Flag code={destination.code} className="rounded text-3xl" />
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-ink">
                Start your application
              </h1>
              <p className="text-sm text-muted">
                {citizenship.name} → {destination.name}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 lg:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ApplicationWizard
            user={user}
            destination={destination}
            citizenship={citizenship}
          />
        </div>
      </section>
    </>
  )
}
