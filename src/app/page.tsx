import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navigation } from '@/components/shared/navigation'
import { Footer } from '@/components/shared/footer'
import {
  BookOpen,
  MessageSquare,
  Sparkles,
  Hash,
  ArrowRight,
  Users,
  Shield,
  Globe,
} from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Biblioteca Digital',
    description:
      'Acesse uma coleção curada de livros sobre ocultismo, esoterismo e filosofia hermética. Leitor integrado com marcadores e progresso.',
    href: '/biblioteca',
  },
  {
    icon: MessageSquare,
    title: 'Fórum de Discussão',
    description:
      'Participe de discussões organizadas por tradições e temas. Compartilhe conhecimento com a comunidade.',
    href: '/forum',
  },
  {
    icon: Sparkles,
    title: 'Sistema de Tarô',
    description:
      'Realize tiragens tradicionais com todos os 78 arcanos. Sem inteligência artificial, apenas sabedoria ancestral.',
    href: '/tarot',
  },
  {
    icon: Hash,
    title: 'Chat em Tempo Real',
    description:
      'Converse com outros estudantes em salas temáticas ou privadas. Chat de texto e voz integrados.',
    href: '/chat',
  },
]

const traditions = [
  'Tarot',
  'Alquimia',
  'Cabala',
  'Hermetismo',
  'Astrologia',
  'Magia Cerimonial',
  'Gnosticismo',
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-[var(--color-accent)]/10" />
          <div className="container relative mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-6">
              Plataforma de Estudos Ocultistas
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              Harpia
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-[var(--color-text-secondary)] md:text-xl">
              Uma biblioteca digital, fórum de discussão e comunidade de estudos
              dedicada ao ocultismo, esoterismo, filosofia hermética e tradições
              ancestrais.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/biblioteca">
                  Explorar Biblioteca
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/register">Criar Conta Grátis</Link>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-2">
              {traditions.map((tradition) => (
                <Badge key={tradition} variant="outline">
                  {tradition}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Recursos Principais</h2>
              <p className="text-[var(--color-text-secondary)]">
                Tudo que você precisa para seus estudos em um só lugar
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Link key={feature.title} href={feature.href}>
                    <Card className="h-full transition-all hover:border-[var(--color-primary)] hover:shadow-[var(--color-primary)]/20">
                      <CardHeader>
                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                          <Icon className="h-6 w-6 text-[var(--color-primary)]" />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 flex justify-center">
                  <BookOpen className="h-8 w-8 text-[var(--color-secondary)]" />
                </div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-[var(--color-text-secondary)]">
                  Livros Disponíveis
                </div>
              </div>
              <div className="text-center">
                <div className="mb-2 flex justify-center">
                  <Users className="h-8 w-8 text-[var(--color-secondary)]" />
                </div>
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm text-[var(--color-text-secondary)]">
                  Estudantes Ativos
                </div>
              </div>
              <div className="text-center">
                <div className="mb-2 flex justify-center">
                  <Globe className="h-8 w-8 text-[var(--color-secondary)]" />
                </div>
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm text-[var(--color-text-secondary)]">
                  Discussões
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-2xl">
              <Shield className="mx-auto mb-6 h-12 w-12 text-[var(--color-primary)]" />
              <h2 className="mb-4 text-3xl font-bold">Comece Sua Jornada</h2>
              <p className="mb-8 text-[var(--color-text-secondary)]">
                Junte-se a milhares de estudantes que já estão explorando os
                mistérios do conhecimento oculto.
              </p>
              <Button size="lg" asChild>
                <Link href="/register">
                  Criar Conta Grátis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
