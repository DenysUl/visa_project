import { useState } from 'react'
import { ChevronDown, MessageCircle } from 'lucide-react'

const faqs = [
  {
    q: 'Що таке електронна віза (e-Visa)?',
    a: "Це офіційний дозвіл на в'їзд, який оформлюється повністю онлайн і надсилається на email. Роздруківка або файл у телефоні — усе, що потрібно на кордоні.",
  },
  {
    q: 'Як швидко я отримаю документ?',
    a: 'Термін залежить від країни та типу документа. Точний строк для вашого напрямку ви побачите одразу після перевірки вимог.',
  },
  {
    q: 'Чи безпечно вводити дані паспорта?',
    a: 'Так. Ми використовуємо сучасні стандарти захисту даних і ніколи не передаємо вашу інформацію третім сторонам.',
  },
  {
    q: 'Що буде, якщо мою заявку відхилять?',
    a: 'Якщо відмова сталася з нашої вини — повернемо вартість послуг на 100%. Наші експерти зроблять усе, щоб цього не сталося.',
  },
  {
    q: 'Чи можу я оформити візу для всієї родини?',
    a: 'Так, в одній заявці можна додати кількох подорожніх — це швидше й зручніше.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Поширені запитання
        </h2>

        <div className="mt-10 divide-y divide-slate-100 rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5">
          {faqs.map((item, i) => {
            const open = openIndex === i
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="text-base font-semibold text-ink">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-primary transition-transform ${
                      open ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {open && (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6">
                    {item.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted">
          <MessageCircle className="size-4 text-primary" />
          Не знайшли відповідь?{' '}
          <a href="#contacts" className="font-semibold text-primary hover:underline">
            Напишіть нам у чат 24/7
          </a>
        </p>
      </div>
    </section>
  )
}
