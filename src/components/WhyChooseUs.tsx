import { Headset, Lock, ShieldCheck, UserCheck } from 'lucide-react'

const benefits = [
  {
    icon: Headset,
    title: 'Підтримка 24/7',
    text: 'Живі люди, а не боти. Чат, email і телефон — українською та англійською.',
  },
  {
    icon: ShieldCheck,
    title: '99% успішних заявок',
    text: 'Експерти перевіряють кожну анкету перед подачею, тож відмови — рідкість.',
  },
  {
    icon: UserCheck,
    title: 'Перевірка експертами',
    text: 'Візові спеціалісти з досвідом 10+ років виправлять помилки до відправки в консульство.',
  },
  {
    icon: Lock,
    title: 'Надійний захист даних',
    text: 'Ваші паспортні дані надійно захищені та використовуються лише для оформлення вашої заявки.',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-primary-light/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Чому мандрівники обирають Visa
          </h2>
          <p className="mt-3 text-base text-muted sm:text-lg">
            Ми беремо бюрократію на себе, щоб ви думали лише про подорож.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-shadow hover:shadow-md"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary text-white">
                <benefit.icon className="size-6" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink">{benefit.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {benefit.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
