import type { ReactNode } from 'react'

interface ErrorMessageProps {
  children: ReactNode
  className?: string
}

export default function ErrorMessage({
  children,
  className = '',
}: ErrorMessageProps) {
  return (
    <p
      role="alert"
      className={`rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 ${className}`}
    >
      {children}
    </p>
  )
}
