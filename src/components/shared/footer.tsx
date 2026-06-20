import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Harpia</span>
            </Link>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Plataforma de estudos de ocultismo, esoterismo e filosofia hermética.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Explorar</h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li>
                <Link href="/biblioteca" className="hover:text-[var(--color-text-primary)]">
                  Biblioteca
                </Link>
              </li>
              <li>
                <Link href="/forum" className="hover:text-[var(--color-text-primary)]">
                  Fórum
                </Link>
              </li>
              <li>
                <Link href="/tarot" className="hover:text-[var(--color-text-primary)]">
                  Tarô
                </Link>
              </li>
              <li>
                <Link href="/comunidades" className="hover:text-[var(--color-text-primary)]">
                  Comunidades
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Comunidade</h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li>
                <Link href="/forum" className="hover:text-[var(--color-text-primary)]">
                  Discussões
                </Link>
              </li>
              <li>
                <Link href="/comunidades" className="hover:text-[var(--color-text-primary)]">
                  Grupos de Estudo
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-[var(--color-text-primary)]">
                  Chat
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li>
                <Link href="/termos" className="hover:text-[var(--color-text-primary)]">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-[var(--color-text-primary)]">
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--color-border-primary)] pt-8 text-center text-sm text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} Harpia. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
