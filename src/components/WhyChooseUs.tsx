import { Headset, Lock, ShieldCheck, UserCheck } from 'lucide-react'

const benefits = [
  {
    icon: Headset,
    title: '24/7 support',
    text: 'Real people, not bots. Chat, email and phone — whenever you need us.',
  },
  {
    icon: ShieldCheck,
    title: '99% approval rate',
    text: 'Experts review every application before submission, so refusals are rare.',
  },
  {
    icon: UserCheck,
    title: 'Expert review',
    text: 'Visa specialists with years of experience fix any mistakes before your application reaches the consulate.',
  },
  {
    icon: Lock,
    title: 'Reliable data protection',
    text: 'Your passport data is securely protected and used only to process your application.',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-primary-light/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Why travelers choose Visa
          </h2>
          <p className="mt-3 text-base text-muted sm:text-lg">
            We take care of the bureaucracy so you can focus on the journey.
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
