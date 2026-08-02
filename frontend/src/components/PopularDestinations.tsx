import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Flag from './Flag'
import { destinations } from '../data/destinations'

export default function PopularDestinations() {
  return (
    <section id="destinations" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Popular Destinations
          </h2>
          <p className="mt-3 text-base text-muted sm:text-lg">
            Pick a country — we will tell you exactly which document you need.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => (
            <article
              key={d.code}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5 transition-shadow hover:shadow-lg"
            >
              {/* Photo placeholder: gradient with big flag */}
              <div
                className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${d.gradient}`}
              >
                <span className="drop-shadow-lg transition-transform group-hover:scale-110">
                  <Flag code={d.code} className="rounded-md text-6xl" />
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-center text-lg font-bold text-ink">
                  {d.name}
                </h3>
                <Link
                  to={`/destinations/${d.code.toLowerCase()}`}
                  className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  Apply now
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#destinations"
            className="inline-flex items-center gap-1.5 text-base font-semibold text-primary hover:text-primary-dark"
          >
            View all 190+ countries
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
