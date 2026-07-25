import { CreditCard, FileText, MailCheck } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    title: 'Заповніть онлайн-форму',
    text: 'Прості запитання зрозумілою мовою. Збережіть чернетку та поверніться будь-коли.',
  },
  {
    icon: CreditCard,
    title: 'Здійсніть безпечну оплату',
    text: 'Visa, Mastercard, Apple Pay або PayPal. Гарантія повернення коштів, якщо заявку відхилять з нашої вини.',
  },
  {
    icon: MailCheck,
    title: 'Отримайте документ на email',
    text: 'Наші експерти перевірять заявку та надішлють готовий документ. Просто роздрукуйте або покажіть із телефона.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Оформлення за 3 простих кроки
          </h2>
          <p className="mt-3 text-base text-muted sm:text-lg">
            Жодної бюрократії. Заповнення заявки займає лічені хвилини.
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
            Почати оформлення
          </a>
        </div>
      </div>
    </section>
  )
}
