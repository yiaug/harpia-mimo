import { Sparkles } from 'lucide-react'

export function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-primary)]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-[var(--color-border-primary)] border-t-[var(--color-primary)]" />
          <Sparkles className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-[var(--color-primary)]" />
        </div>
        <p className="text-[var(--color-text-secondary)]">Carregando...</p>
      </div>
    </div>
  )
}
