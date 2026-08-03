import { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Headset,
  ShieldCheck,
} from 'lucide-react'
import Flag from '../components/Flag'
import ApplicationForm from '../components/ApplicationForm'
import { countries } from '../data/countries'
import { getDestination } from '../data/destinations'
import { resolveVisaPolicy } from '../data/visaPolicies'

export default function DestinationPage() {
  const { code, citizenshipCode: citizenshipCodeFromPath } = useParams<{
    code: string
    citizenshipCode?: string
  }>()
  const [searchParams] = useSearchParams()
  const destination = code ? getDestination(code) : undefined
  const citizenshipCode =
    citizenshipCodeFromPath?.toUpperCase() ??
    searchParams.get('citizenship')?.toUpperCase()
  const citizenship = citizenshipCode
    ? countries.find((country) => country.code === citizenshipCode)
    : null
  const policy = resolveVisaPolicy(destination?.code ?? '', citizenshipCode)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [code])

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
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-teal-600 to-cyan-500">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            All destinations
          </Link>
          <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <span className="drop-shadow-xl">
              <Flag code={destination.code} className="rounded-lg text-7xl" />
            </span>
            <div>
              {citizenship && (
                <p className="mb-3 inline-flex rounded-full border border-white/40 bg-white/20 px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
                  eVisa policy: {citizenship.name} citizens to{' '}
                  {destination.name}
                </p>
              )}
              {!citizenship && (
                <p className="mb-3 inline-flex rounded-full border border-white/40 bg-white/20 px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
                  eVisa policy: select nationality on home page for
                  country-specific requirements
                </p>
              )}
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                {destination.name}
              </h1>
              <p className="mt-2 text-base text-white/85 sm:text-lg">
                {destination.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-16 lg:px-8">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Travel to {destination.name} the easy way
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {destination.description}
            </p>

            <h3 className="mt-10 flex items-center gap-2 text-lg font-bold text-ink">
              <FileText className="size-5 text-primary" />
              {citizenship
                ? `Requirements for ${citizenship.name} citizens`
                : 'Requirements'}
            </h3>
            <ul className="mt-4 space-y-3">
              {policy.documents.map((doc) => (
                <li key={doc} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                  <span className="text-sm text-ink">{doc}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="flex gap-3 rounded-2xl bg-primary-light/60 p-5">
                <ShieldCheck className="size-6 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-bold text-ink">Expert review</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Every application is checked by a specialist before
                    submission.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 rounded-2xl bg-primary-light/60 p-5">
                <Headset className="size-6 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-bold text-ink">24/7 support</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Real people ready to help at any stage of your
                    application.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Application form */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ApplicationForm destination={destination} />
          </div>
        </div>
      </section>
    </>
  )
}
