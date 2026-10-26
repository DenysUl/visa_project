import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  buildApplicationPath,
  buildDestinationPath,
  routePaths,
} from '@/config/routes'
import AuthGateDialog from '@/features/auth/AuthGateDialog'
import { useAuth } from '@/features/auth/useAuth'
import CountrySelect from '@/features/countries/CountrySelect'
import {
  findCountryByCode,
  type Country,
} from '@/features/countries/countries'
import DestinationHero from '@/features/destinations/DestinationHero'
import VisaPolicyContent from '@/features/destinations/VisaPolicyContent'
import { getDestination } from '@/features/destinations/destinations'
import { resolveVisaPolicy } from '@/features/destinations/visaPolicies'

type DestinationRouteParams = {
  code: string
  citizenshipCode?: string
}

/** Legacy `?citizenship=xx` links are still supported */
const LEGACY_CITIZENSHIP_QUERY_PARAM = 'citizenship'

export default function DestinationPage() {
  const { code, citizenshipCode: citizenshipCodeFromPath } =
    useParams<DestinationRouteParams>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const destination = code ? getDestination(code) : undefined
  const citizenshipCode =
    citizenshipCodeFromPath?.toUpperCase() ??
    searchParams.get(LEGACY_CITIZENSHIP_QUERY_PARAM)?.toUpperCase()
  const citizenship = citizenshipCode
    ? findCountryByCode(citizenshipCode)
    : undefined
  const policy = resolveVisaPolicy(destination?.code ?? '', citizenshipCode)
  const [pendingCitizenship, setPendingCitizenship] = useState<Country | null>(
    null,
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [code, citizenshipCode])

  if (!destination) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold text-ink">
          Destination not found
        </h1>
        <p className="mt-3 text-muted">
          We could not find this destination. Please pick one from the list on
          the home page.
        </p>
        <Link
          to={routePaths.home}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
      </div>
    )
  }

  const showAuthGate = !authLoading && !user && Boolean(citizenship)
  const showFullPolicy = Boolean(user) && Boolean(citizenship)

  return (
    <>
      {showAuthGate && (
        <AuthGateDialog
          destinationName={destination.name}
          citizenshipName={citizenship?.name}
        />
      )}

      <DestinationHero destination={destination} citizenship={citizenship} />

      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-16 lg:px-8">
          <div>
            {!citizenship && (
              <div className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 sm:p-7">
                <h2 className="text-xl font-extrabold text-ink">
                  Select your nationality
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Requirements depend on the passport you travel with.
                </p>
                <div className="mt-5">
                  <CountrySelect
                    label="I am a citizen of"
                    placeholder="Select your citizenship"
                    value={pendingCitizenship}
                    onChange={setPendingCitizenship}
                  />
                </div>
                <button
                  type="button"
                  disabled={!pendingCitizenship}
                  onClick={() => {
                    if (!pendingCitizenship) return
                    navigate(
                      buildDestinationPath(
                        destination.code,
                        pendingCitizenship.code,
                      ),
                    )
                  }}
                  className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-bold text-white transition-colors hover:bg-accent-dark disabled:opacity-50"
                >
                  Continue
                  <ArrowRight className="size-4" />
                </button>
              </div>
            )}

            {showFullPolicy && citizenship && (
              <VisaPolicyContent
                destination={destination}
                citizenship={citizenship}
                policy={policy}
              />
            )}

            {authLoading && citizenship && (
              <p className="text-sm text-muted">Loading your session…</p>
            )}
          </div>

          {showFullPolicy && citizenship && (
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 sm:p-7">
                <h3 className="text-xl font-extrabold text-ink">
                  Start my application
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Answer a few questions, upload documents and pay for your
                  order.
                </p>
                <Link
                  to={buildApplicationPath(destination.code, citizenship.code)}
                  className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-bold text-white transition-colors hover:bg-accent-dark"
                >
                  Start my application
                  <ArrowRight className="size-5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
