import { MessageCircle, PhoneCall } from 'lucide-react'
import { siteConfig } from '@/config/site'

export default function ContactWidget() {
  const { chatUrl, phone } = siteConfig.contact

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a
        href={chatUrl}
        aria-label="Open chat"
        className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
      >
        <MessageCircle className="size-5" />
      </a>
      <a
        href={`tel:${phone}`}
        aria-label="Call us"
        className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-700 text-white shadow-lg shadow-teal-700/30 transition-colors hover:bg-teal-600"
      >
        <PhoneCall className="size-5" />
      </a>
    </div>
  )
}
