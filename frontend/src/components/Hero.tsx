import { useState, type CSSProperties } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Globe,
  Plane,
  ShieldCheck,
} from 'lucide-react'
import CountrySelect from './CountrySelect'
import Flag from './Flag'
import { countries, type Country } from '../data/countries'

const defaultCitizenship =
  countries.find((c) => c.code === 'UA') ?? countries[0]

export default function Hero() {
  const [citizenship, setCitizenship] = useState<Country | null>(
    defaultCitizenship,
  )
  const [destination, setDestination] = useState<Country | null>(null)

  const handleCheck = () => {
    if (!citizenship || !destination) return
    // Placeholder: this will navigate to the requirements page
    alert(`Checking requirements: ${citizenship.name} → ${destination.name}`)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-light via-primary-light/60 to-white">
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-40 size-72 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-14">
          {/* Left column: copy + search widget */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary sm:text-sm">
              <BadgeCheck className="size-4" />
              Trusted by travelers worldwide
            </span>

            {/* H1 */}
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl xl:text-6xl">
              Get your visa to{' '}
              <span className="text-primary">190+ countries</span> in one
              click
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted sm:text-lg lg:mx-0">
              Fast, secure and 100% online. No embassy queues, no paperwork —
              we handle everything for you.
            </p>

            {/* Search widget */}
            <div className="mt-8 rounded-2xl bg-white p-4 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 sm:p-5">
              <div className="flex flex-col gap-3">
                <CountrySelect
                  label="I am a citizen of"
                  placeholder="Select your citizenship"
                  value={citizenship}
                  onChange={setCitizenship}
                />
                <CountrySelect
                  label="I am traveling to"
                  placeholder="Select your destination"
                  value={destination}
                  onChange={setDestination}
                />
                <button
                  type="button"
                  onClick={handleCheck}
                  className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-base font-bold text-white transition-colors hover:bg-accent-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                >
                  Check Requirements
                  <ArrowRight className="size-5" />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-muted sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-primary" />
                  Free check
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4 text-primary" />
                  Instant result
                </span>
              </div>
            </div>
          </div>

          {/* Right column: animated banner */}
          <div
            aria-hidden="true"
            className="relative mx-auto h-72 w-full max-w-sm sm:h-80 lg:h-[28rem] lg:max-w-none"
          >
            {/* Backdrop panel */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary via-blue-600 to-sky-400 shadow-2xl shadow-primary/30" />
            {/* World dots texture */}
            <div
              className="absolute inset-0 rounded-3xl opacity-30"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '18px 18px',
              }}
            />

            {/* Flying plane along a path */}
            <svg
              className="absolute inset-0 size-full overflow-visible"
              viewBox="0 0 400 448"
              fill="none"
            >
              <path
                d="M 30 360 C 120 260, 280 240, 370 90"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
                strokeDasharray="6 8"
              />
            </svg>
            <span
              className="animate-fly-return absolute"
              style={{
                offsetPath: "path('M 30 360 C 120 260, 280 240, 370 90')",
                offsetRotate: 'auto 45deg',
              }}
            >
              <span className="animate-plane-turn block">
                <Plane
                  className="size-8 text-white drop-shadow-lg"
                  strokeWidth={1.25}
                />
              </span>
            </span>

            {/* Passport card */}
            <div
              className="animate-float absolute left-5 top-8 w-40 rounded-2xl bg-slate-900 p-4 shadow-xl sm:left-8 sm:top-10 lg:w-48"
              style={{ '--float-rotate': '-6deg' } as CSSProperties}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                  Passport
                </span>
                <Globe className="size-4 text-amber-300" />
              </div>
              <div className="mt-4 grid size-12 place-items-center rounded-full bg-amber-300/20">
                <Globe className="size-7 text-amber-300" />
              </div>
              <div className="mt-4 space-y-1.5">
                <div className="h-1.5 w-3/4 rounded bg-slate-700" />
                <div className="h-1.5 w-1/2 rounded bg-slate-700" />
              </div>
            </div>

            {/* Approved card */}
            <div
              className="animate-pop absolute bottom-8 right-4 w-52 rounded-2xl bg-white p-4 shadow-xl sm:right-8 lg:w-60"
              style={{ '--float-rotate': '3deg' } as CSSProperties}
            >
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-100">
                  <CheckCircle2 className="size-5 text-emerald-600" />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">Visa approved!</p>
                  <p className="text-xs text-muted">
                    Document sent to your email
                  </p>
                </div>
              </div>
            </div>

            {/* Floating flag (top right) */}
            <span
              className="animate-float-slow absolute right-8 top-6 drop-shadow-lg"
              style={{ animationDelay: '0.9s' }}
            >
              <Flag code="JP" className="text-3xl" />
            </span>

            {/* Floating flags */}
            <span className="animate-float-slow absolute bottom-24 left-6 drop-shadow-lg sm:bottom-28">
              <Flag code="AE" className="text-3xl" />
            </span>
            <span
              className="animate-float absolute left-1/2 top-4 drop-shadow-lg"
              style={{ animationDelay: '0.6s' }}
            >
              <Flag code="US" className="text-3xl" />
            </span>
            <span
              className="animate-float absolute bottom-6 left-1/3 drop-shadow-lg"
              style={{ animationDelay: '1.8s' }}
            >
              <Flag code="EU" className="text-3xl" />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
