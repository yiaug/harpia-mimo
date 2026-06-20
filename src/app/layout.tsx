import type { Metadata } from 'next'
import { Providers } from '@/components/shared/providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Harpia - Estudos de Ocultismo e Esoterismo',
  description:
    'Plataforma de estudos de ocultismo, esoterismo, filosofia hermética, alquimia, magia, tarot, cabala e gnosticismo.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
