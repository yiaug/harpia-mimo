'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BookOpen, Search, Plus, Edit, Trash2 } from 'lucide-react'

interface Book {
  id: string
  title: string
  author: string | null
  year: number | null
  pages: number | null
  difficulty: string | null
  ratingAvg: number
  createdAt: string
  categories: { category: { name: string } }[]
}

export default function AdminBooksPage() {
  const [books, setBooks] = React.useState<Book[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    fetch('/api/books?pageSize=100')
      .then((r) => r.json())
      .then((data) => setBooks(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    (b.author && b.author.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Livros</h1>
        <p className="text-[var(--color-text-secondary)]">{books.length} total</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <Input placeholder="Buscar livros..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Livros</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-16 animate-pulse rounded-lg bg-[var(--color-bg-tertiary)]" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border-primary)]">
                    <th className="pb-3 text-left font-medium text-[var(--color-text-muted)]">Livro</th>
                    <th className="pb-3 text-left font-medium text-[var(--color-text-muted)]">Autor</th>
                    <th className="pb-3 text-left font-medium text-[var(--color-text-muted)]">Categoria</th>
                    <th className="pb-3 text-left font-medium text-[var(--color-text-muted)]">Páginas</th>
                    <th className="pb-3 text-left font-medium text-[var(--color-text-muted)]">Avaliação</th>
                    <th className="pb-3 text-right font-medium text-[var(--color-text-muted)]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((book) => (
                    <tr key={book.id} className="border-b border-[var(--color-border-primary)] last:border-0">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded bg-[var(--color-bg-secondary)]">
                            <BookOpen className="h-5 w-5 text-[var(--color-text-muted)]" />
                          </div>
                          <span className="font-medium">{book.title}</span>
                        </div>
                      </td>
                      <td className="py-4 text-[var(--color-text-secondary)]">{book.author || '—'}</td>
                      <td className="py-4">
                        {book.categories[0] && <Badge variant="secondary">{book.categories[0].category.name}</Badge>}
                      </td>
                      <td className="py-4 text-[var(--color-text-secondary)]">{book.pages || '—'}</td>
                      <td className="py-4">{book.ratingAvg > 0 ? book.ratingAvg.toFixed(1) : '—'}</td>
                      <td className="py-4 text-right">
                        <Link href={`/biblioteca/${book.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
