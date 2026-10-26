import type { ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

interface SubmitButtonProps {
  isLoading: boolean
  loadingLabel: string
  children: ReactNode
}

export default function SubmitButton({
  isLoading,
  loadingLabel,
  children,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-base font-bold text-white transition-colors hover:bg-accent-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isLoading ? (
        <>
          <Loader2 className="size-5 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </button>
  )
}
