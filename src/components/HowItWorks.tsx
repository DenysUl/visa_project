import { CreditCard, FileText, MailCheck } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    title: 'Fill out a simple online form',
    text: 'Plain questions in plain language. Save a draft and come back anytime.',
  },
  {
    icon: CreditCard,
    title: 'Make a secure payment',
    text: 'Visa, Mastercard, Apple Pay or PayPal. Money-back guarantee if your application is rejected due to our fault.',
  },
  {
    icon: MailCheck,
    title: 'Receive your document by email',
    text: 'Our experts review your application and send you the ready document. Just print it or show it on your phone.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Get your document in 3 simple steps
          </h2>
          <p className="mt-3 text-base text-muted sm:text-lg">
            No bureaucracy. Filling out the application takes just a few
            minutes.
          </p>
        </div>

        <ol className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          {steps.map((step, i) => (
            <li key={step.title} className="relative text-center">
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[calc(50%+3rem)] top-8 hidden h-0.5 w-[calc(100%-6rem)] border-t-2 border-dashed border-primary/30 sm:block"
                />
              )}
              <div className="relative mx-auto grid size-16 place-items-center rounded-2xl bg-primary-light">
                <step.icon className="size-7 text-primary" />
                <span className="absolute -right-1.5 -top-1.5 grid size-6 place-items-center rounded-full bg-accent text-xs font-bold text-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">
                {step.text}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 text-center">
          <a
            href="#top"
            className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-3.5 text-base font-bold text-white transition-colors hover:bg-accent-dark"
          >
            Start my application
          </a>
        </div>
      </div>
    </section>
  )
}
