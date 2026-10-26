import { Check } from 'lucide-react'
import { WIZARD_STEPS, type WizardStepId } from './types'

interface StepIndicatorProps {
  current: WizardStepId
}

export default function StepIndicator({ current }: StepIndicatorProps) {
  const currentIndex = WIZARD_STEPS.findIndex((step) => step.id === current)

  return (
    <ol className="flex items-center gap-2">
      {WIZARD_STEPS.map((step, index) => {
        const done = index < currentIndex
        const active = index === currentIndex
        return (
          <li key={step.id} className="flex min-w-0 flex-1 items-center gap-2">
            <span
              className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                done
                  ? 'bg-primary text-white'
                  : active
                    ? 'bg-accent text-white'
                    : 'bg-slate-100 text-muted'
              }`}
            >
              {done ? <Check className="size-4" /> : index + 1}
            </span>
            <span
              className={`hidden truncate text-xs font-semibold sm:inline ${
                active ? 'text-ink' : 'text-muted'
              }`}
            >
              {step.label}
            </span>
            {index < WIZARD_STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className={`h-px min-w-4 flex-1 ${
                  done ? 'bg-primary' : 'bg-slate-200'
                }`}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}
