interface FlagProps {
  code: string
  className?: string
}

/**
 * SVG-прапор із пакета flag-icons. Ширина масштабується від font-size,
 * тому розмір задається текстовими класами (text-lg, text-3xl тощо).
 */
export default function Flag({ code, className = '' }: FlagProps) {
  return (
    <span
      className={`fi fi-${code.toLowerCase()} rounded-[0.15em] shadow-sm ${className}`}
    />
  )
}
