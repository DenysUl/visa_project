interface FlagProps {
  code: string
  className?: string
}


export default function Flag({ code, className = '' }: FlagProps) {
  return (
    <span
      className={`fi fi-${code.toLowerCase()} rounded-[0.15em] shadow-sm ${className}`}
    />
  )
}
