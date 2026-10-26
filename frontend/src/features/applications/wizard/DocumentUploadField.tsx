import { useRef } from 'react'
import { FileUp, X } from 'lucide-react'

interface DocumentUploadFieldProps {
  label: string
  fileName?: string
  onSelect: (fileName: string) => void
  onClear: () => void
}

const ACCEPTED_TYPES = 'image/jpeg,image/png,application/pdf'

export default function DocumentUploadField({
  label,
  fileName,
  onSelect,
  onClear,
}: DocumentUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </p>
      {fileName ? (
        <div className="flex h-13 items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4">
          <span className="truncate text-sm font-medium text-ink">{fileName}</span>
          <button
            type="button"
            aria-label={`Remove ${label}`}
            onClick={onClear}
            className="grid size-8 place-items-center rounded-lg text-muted hover:bg-white hover:text-red-600"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-13 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 text-sm font-medium text-muted transition-colors hover:border-primary hover:bg-primary-light hover:text-primary"
        >
          <FileUp className="size-4" />
          Upload PDF or photo
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) onSelect(file.name)
          event.target.value = ''
        }}
      />
    </div>
  )
}
