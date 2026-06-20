'use client'

import * as React from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/shared/navigation'
import { Footer } from '@/components/shared/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Star, ChevronLeft, Heart, Bookmark, Download } from 'lucide-react'

interface BookDetail {
  id: string
  title: string
  author: string | null
  description: string | null
  coverUrl: string | null
  pdfUrl: string | null
  year: number | null
  language: string | null
  pages: number | null
  difficulty: string | null
  ratingAvg: number
  ratingCount: number
  categories: { category: { name: string; slug: string } }[]
  tags: { tag: { name: string; slug: string } }[]
  ratings: { rating: number; review: string | null; createdAt: string; user: { username: string } }[]
}

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const [book, setBook] = React.useState<BookDetail | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch(`/api/books/${params.id}`)
      .then((r) => r.json())
      .then((data) => setBook(data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-[350px_1fr]">
            <div className="h-96 animate-pulse rounded-xl bg-[var(--color-bg-tertiary)]" />
            <div className="space-y-4">
              <div className="h-8 w-64 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
              <div className="h-4 w-48 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
              <div className="h-32 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8 text-center">
          <p className="text-lg text-[var(--color-text-secondary)]">Livro não encontrado</p>
          <Link href="/biblioteca"><Button variant="outline" className="mt-4">Voltar à Biblioteca</Button></Link>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Link href="/biblioteca" className="mb-6 flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
            <ChevronLeft className="h-4 w-4" /> Biblioteca
          </Link>

          <div className="grid gap-8 lg:grid-cols-[350px_1fr]">
            <div className="space-y-4">
              <div className="flex aspect-[3/4] items-center justify-center rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)]">
                <BookOpen className="h-24 w-24 text-[var(--color-text-muted)]" />
              </div>
              <Button className="w-full" size="lg">
                <BookOpen className="mr-2 h-5 w-5" />
                Ler Agora
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline"><Bookmark className="mr-2 h-4 w-4" /> Salvar</Button>
                <Button variant="outline"><Heart className="mr-2 h-4 w-4" /> Favoritar</Button>
              </div>
              {book.pdfUrl && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                  </a>
                </Button>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {book.categories.map((bc) => (
                    <Badge key={bc.category.slug} variant="secondary">{bc.category.name}</Badge>
                  ))}
                </div>
                <h1 className="text-3xl font-bold">{book.title}</h1>
                {book.author && <p className="mt-2 text-lg text-[var(--color-text-secondary)]">por {book.author}</p>}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-5 w-5 ${s <= Math.round(book.ratingAvg) ? 'fill-[var(--color-secondary)] text-[var(--color-secondary)]' : 'text-[var(--color-text-muted)]'}`} />
                  ))}
                </div>
                <span className="text-lg font-semibold">{book.ratingAvg > 0 ? book.ratingAvg.toFixed(1) : '—'}</span>
                <span className="text-sm text-[var(--color-text-muted)]">({book.ratingCount} avaliações)</span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {book.pages && (
                  <div className="rounded-lg border border-[var(--color-border-primary)] p-3">
                    <div className="text-xs text-[var(--color-text-muted)]">Páginas</div>
                    <div className="text-lg font-semibold">{book.pages}</div>
                  </div>
                )}
                {book.year && (
                  <div className="rounded-lg border border-[var(--color-border-primary)] p-3">
                    <div className="text-xs text-[var(--color-text-muted)]">Ano</div>
                    <div className="text-lg font-semibold">{book.year}</div>
                  </div>
                )}
                {book.language && (
                  <div className="rounded-lg border border-[var(--color-border-primary)] p-3">
                    <div className="text-xs text-[var(--color-text-muted)]">Idioma</div>
                    <div className="text-lg font-semibold">{book.language}</div>
                  </div>
                )}
                {book.difficulty && (
                  <div className="rounded-lg border border-[var(--color-border-primary)] p-3">
                    <div className="text-xs text-[var(--color-text-muted)]">Dificuldade</div>
                    <div className="text-lg font-semibold capitalize">{book.difficulty}</div>
                  </div>
                )}
              </div>

              {book.description && (
                <div>
                  <h2 className="mb-3 text-xl font-semibold">Sinopse</h2>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">{book.description}</p>
                </div>
              )}

              {book.tags.length > 0 && (
                <div>
                  <h2 className="mb-3 text-xl font-semibold">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {book.tags.map((bt) => (
                      <Badge key={bt.tag.slug} variant="outline">{bt.tag.name}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {book.ratings.length > 0 && (
                <div>
                  <h2 className="mb-4 text-xl font-semibold">Avaliações da Comunidade</h2>
                  <div className="space-y-3">
                    {book.ratings.map((r, i) => (
                      <Card key={i}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">u/{r.user.username}</span>
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className={`h-3 w-3 ${s <= r.rating ? 'fill-[var(--color-secondary)] text-[var(--color-secondary)]' : 'text-[var(--color-text-muted)]'}`} />
                                  ))}
                                </div>
                              </div>
                              {r.review && <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{r.review}</p>}
                            </div>
                            <span className="text-xs text-[var(--color-text-muted)]">
                              {new Date(r.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
