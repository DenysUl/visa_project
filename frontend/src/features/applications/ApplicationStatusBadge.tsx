const statusStyles: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
}

const fallbackStatusStyle = 'bg-slate-100 text-slate-600'

export default function ApplicationStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${
        statusStyles[status] ?? fallbackStatusStyle
      }`}
    >
      {status}
    </span>
  )
}
