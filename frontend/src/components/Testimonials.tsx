import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

interface Testimonial {
  name: string
  trip: string
  text: string
  initials: string
  color: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Olena K.',
    trip: 'UAE e-Visa',
    text: 'Applied in one evening and the document arrived sooner than I expected. Support answered late at night — impressed!',
    initials: 'OK',
    color: 'bg-rose-500',
  },
  {
    name: 'Andrew M.',
    trip: 'India e-Visa',
    text: 'The form was quick and simple. Visa arrived faster than promised. Flawless.',
    initials: 'AM',
    color: 'bg-emerald-500',
  },
  {
    name: 'Maria & Ihor',
    trip: 'Schengen Visa',
    text: 'An expert spotted a mistake in the passport date before submission — they saved our vacation. Thank you!',
    initials: 'MI',
    color: 'bg-violet-500',
  },
  {
    name: 'Dmytro S.',
    trip: 'Turkey e-Visa',
    text: 'The visa arrived before I finished packing my suitcase. Recommending it to all my friends.',
    initials: 'DS',
    color: 'bg-sky-500',
  },
  {
    name: 'Sofia R.',
    trip: 'UK ETA',
    text: 'Clear instructions, fair price, zero stress. My ETA was approved in no time.',
    initials: 'SR',
    color: 'bg-amber-500',
  },
]

function Stars() {
  return (
    <span className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-emerald-500 text-emerald-500" />
      ))}
    </span>
  )
}

export default function Testimonials() {
  const [page, setPage] = useState(0)
  const perPage = 3
  const pages = Math.ceil(testimonials.length / perPage)

  const prev = () => setPage((p) => (p - 1 + pages) % pages)
  const next = () => setPage((p) => (p + 1) % pages)

  const visible = testimonials.slice(page * perPage, page * perPage + perPage)

  return (
    <section id="testimonials" className="bg-primary-light/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Trusted by travelers around the world
          </h2>
          <div className="mt-4 flex items-center gap-2">
            <Stars />
            <span className="text-sm font-semibold text-ink">
              Trustpilot 4.9/5
            </span>
            <span className="text-sm text-muted">· 38,000+ reviews</span>
          </div>
        </div>

        {/* Mobile: horizontal scroll-snap; Desktop: paged grid */}
        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:hidden">
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.name}
              t={t}
              className="w-80 shrink-0 snap-center"
            />
          ))}
        </div>

        <div className="mt-12 hidden lg:block">
          <div className="grid grid-cols-3 gap-6">
            {visible.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
          {pages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous reviews"
                className="grid size-11 place-items-center rounded-full bg-white text-ink shadow-sm ring-1 ring-slate-900/10 transition-colors hover:bg-primary hover:text-white"
              >
                <ChevronLeft className="size-5" />
              </button>
              <span className="text-sm font-medium text-muted">
                {page + 1} / {pages}
              </span>
              <button
                type="button"
                onClick={next}
                aria-label="Next reviews"
                className="grid size-11 place-items-center rounded-full bg-white text-ink shadow-sm ring-1 ring-slate-900/10 transition-colors hover:bg-primary hover:text-white"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  t,
  className = '',
}: {
  t: Testimonial
  className?: string
}) {
  return (
    <figure
      className={`flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 ${className}`}
    >
      <Stars />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">
        “{t.text}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span
          className={`grid size-10 place-items-center rounded-full text-sm font-bold text-white ${t.color}`}
        >
          {t.initials}
        </span>
        <span>
          <span className="block text-sm font-bold text-ink">{t.name}</span>
          <span className="block text-xs text-muted">{t.trip}</span>
        </span>
      </figcaption>
    </figure>
  )
}
