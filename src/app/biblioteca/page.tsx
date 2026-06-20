'use client'

import * as React from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/shared/navigation'
import { Footer } from '@/components/shared/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BookOpen, Search, Star, Eye, Filter } from 'lucide-react'

interface Book {
  id: string
  title: string
  slug: string
  author: string | null
  coverUrl: string | null
  year: number | null
  pages: number | null
  difficulty: string | null
  ratingAvg: number
  ratingCount: number
  categories: { category: { name: string; slug: string } }[]
}

interface Category {
  id: string
  name: string
  slug: string
}

export default function BibliotecaPage() {
  const [books, setBooks] = React.useState<Book[]>([])
  const [categories, setCategories] = React.useState<Category[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState(1)

  React.useEffect(() => {
    async function fetchData() {
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          pageSize: '12',
        })
        if (search) params.set('search', search)
        if (selectedCategory) params.set('category', selectedCategory)

        const res = await fetch(`/api/books?${params}`)
        const data = await res.json()
        setBooks(data.data || [])
        setTotalPages(data.totalPages || 1)
      } catch (error) {
        console.error('Error fetching books:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [page, search, selectedCategory])

  React.useEffect(() => {
    fetch('/api/communities')
      .then((r) => r.json())
      .then((data) => setCategories(data.data || []))
      .catch(() => {})
  }, [])

  const difficultyColors: Record<string, string> = {
    Iniciante: 'bg-green-500/10 text-green-400',
    Intermediário: 'bg-yellow-500/10 text-yellow-400',
    Avançado: 'bg-red-500/10 text-red-400',
    beginner: 'bg-green-500/10 text-green-400',
    intermediate: 'bg-yellow-500/10 text-yellow-400',
    advanced: 'bg-red-500/10 text-red-400',
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Biblioteca</h1>
            <p className="mt-2 text-[var(--color-text-secondary)]">
              Explore nossa coleção de livros sobre ocultismo e esoterismo
            </p>
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <Input
                placeholder="Buscar livros por título ou autor..."
                className="pl-10"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              />
            </div>
            <Button variant="outline" onClick={() => { setSearch(''); setSelectedCategory(''); setPage(1) }}>
              <Filter className="mr-2 h-4 w-4" />
              Limpar Filtros
            </Button>
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-xl bg-[var(--color-bg-tertiary)]" />
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <BookOpen className="mb-4 h-12 w-12 text-[var(--color-text-muted)]" />
              <p className="text-lg text-[var(--color-text-secondary)]">Nenhum livro encontrado</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => (
                <Link key={book.id} href={`/biblioteca/${book.id}`}>
                  <Card className="h-full transition-all hover:border-[var(--color-primary)] hover:shadow-[var(--color-primary)]/20">
                    <CardHeader className="pb-3">
                      <div className="mb-3 flex aspect-[3/4] items-center justify-center rounded-lg bg-[var(--color-bg-secondary)]">
                        <BookOpen className="h-12 w-12 text-[var(--color-text-muted)]" />
                      </div>
                      {book.categories[0] && (
                        <Badge variant="secondary" className="w-fit text-xs">
                          {book.categories[0].category.name}
                        </Badge>
                      )}
                      <CardTitle className="line-clamp-2 text-lg">{book.title}</CardTitle>
                      <p className="text-sm text-[var(--color-text-secondary)]">{book.author}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-[var(--color-secondary)] text-[var(--color-secondary)]" />
                          <span>{book.ratingAvg > 0 ? book.ratingAvg.toFixed(1) : '—'}</span>
                        </div>
                        {book.pages && (
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{book.pages}p</span>
                          </div>
                        )}
                        {book.difficulty && (
                          <Badge variant="secondary" className={`text-xs ${difficultyColors[book.difficulty] || ''}`}>
                            {book.difficulty}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                Anterior
              </Button>
              <span className="flex items-center px-4 text-sm text-[var(--color-text-muted)]">
                {page} / {totalPages}
              </span>
              <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                Próximo
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
