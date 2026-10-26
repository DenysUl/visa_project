import { CheckCircle2, FileText, Plane, Wallet } from 'lucide-react'
import type { Country } from '@/features/countries/countries'
import type { Destination } from './destinations'
import type { VisaPolicy } from './visaPolicies'

interface VisaPolicyContentProps {
  destination: Destination
  citizenship?: Country
  policy: VisaPolicy
}

export default function VisaPolicyContent({
  destination,
  citizenship,
  policy,
}: VisaPolicyContentProps) {
  return (
    <div>
      <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        Visa policy
        {citizenship ? ` for ${citizenship.name} citizens` : ''}
      </h2>
      <p className="mt-2 text-sm font-semibold text-primary">{policy.visaType}</p>
      <p className="mt-4 text-base leading-relaxed text-muted">
        {policy.overview} This outline is for travel to {destination.name}
        {citizenship ? ` from ${citizenship.name}` : ''}.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {['Skyline', 'Nature', 'City'].map((label, index) => (
          <div
            key={label}
            className={`flex h-36 items-end rounded-2xl bg-gradient-to-br ${destination.gradient} p-3`}
          >
            <span className="rounded-md bg-white/90 px-2 py-1 text-xs font-semibold text-ink">
              Photo {index + 1}
            </span>
          </div>
        ))}
      </div>

      <h3 className="mt-10 flex items-center gap-2 text-lg font-bold text-ink">
        <FileText className="size-5 text-primary" />
        Documents to upload
      </h3>
      <ul className="mt-4 space-y-3">
        {policy.documents.map((doc) => (
          <li key={doc} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
            <span className="text-sm text-ink">{doc}</span>
          </li>
        ))}
      </ul>

      <h3 className="mt-10 flex items-center gap-2 text-lg font-bold text-ink">
        <Wallet className="size-5 text-primary" />
        Price
      </h3>
      <div className="mt-4 rounded-2xl bg-primary-light/70 p-5">
        <p className="text-2xl font-extrabold text-ink">{policy.price.amount}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          {policy.price.note}
        </p>
      </div>

      <h3 className="mt-10 flex items-center gap-2 text-lg font-bold text-ink">
        <Plane className="size-5 text-primary" />
        Other services before you travel
      </h3>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {policy.extraServices.map((service) => (
          <li
            key={service.name}
            className="rounded-2xl bg-white p-5 ring-1 ring-slate-900/5"
          >
            <p className="text-sm font-bold text-ink">{service.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {service.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
