import { ArrowRight } from 'lucide-react'
import Flag from './Flag'

interface Destination {
  name: string
  code: string
  gradient: string
}

const destinations: Destination[] = [
  { name: 'США', code: 'US', gradient: 'from-blue-600 to-indigo-800' },
  { name: 'Шенген (Європа)', code: 'EU', gradient: 'from-sky-500 to-blue-700' },
  { name: 'ОАЕ', code: 'AE', gradient: 'from-amber-500 to-orange-700' },
  { name: 'Індія', code: 'IN', gradient: 'from-orange-500 to-rose-700' },
  { name: 'Велика Британія', code: 'GB', gradient: 'from-slate-600 to-slate-900' },
  { name: 'Канада', code: 'CA', gradient: 'from-red-500 to-rose-800' },
  { name: 'Туреччина', code: 'TR', gradient: 'from-teal-500 to-cyan-800' },
  { name: 'Японія', code: 'JP', gradient: 'from-pink-500 to-fuchsia-800' },
]

export default function PopularDestinations() {
  return (
    <section id="destinations" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Популярні напрямки
          </h2>
          <p className="mt-3 text-base text-muted sm:text-lg">
            Оберіть країну — і ми підкажемо, який документ потрібен саме вам.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => (
            <article
              key={d.name}
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
                <a
                  href="#top"
                  className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  Оформити
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#destinations"
            className="inline-flex items-center gap-1.5 text-base font-semibold text-primary hover:text-primary-dark"
          >
            Дивитись усі 190+ країн
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
