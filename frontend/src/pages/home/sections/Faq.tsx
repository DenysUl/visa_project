import { useState } from 'react'
import { ChevronDown, MessageCircle } from 'lucide-react'

interface FaqItem {
  q: string
  a: string
}

const faqs: readonly FaqItem[] = [
  {
    q: 'What is an electronic visa (eVisa)?',
    a: 'It is an official entry permit issued entirely online and delivered to your email. A printout or the file on your phone is all you need at the border.',
  },
  {
    q: 'How fast will I receive my document?',
    a: 'It depends on the country and document type. You will see the exact timeline for your destination right after checking the requirements.',
  },
  {
    q: 'Is it safe to enter my passport details?',
    a: 'Yes. We follow modern data protection standards and never share your information with third parties.',
  },
  {
    q: 'What happens if my application is rejected?',
    a: 'If the refusal is our fault, we refund our service fee in full. Our experts do everything to make sure that never happens.',
  },
  {
    q: 'Can I apply for my whole family?',
    a: 'Yes, you can add several travelers to a single application — it is faster and more convenient.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Frequently Asked Questions
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
          Didn&apos;t find your answer?{' '}
          <a
            href="#contacts"
            className="font-semibold text-primary hover:underline"
          >
            Message us in chat 24/7
          </a>
        </p>
      </div>
    </section>
  )
}
