'use client'

import * as React from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/shared/navigation'
import { Footer } from '@/components/shared/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Users, MessageSquare, ChevronRight } from 'lucide-react'

interface Community {
  id: string
  name: string
  slug: string
  description: string | null
  memberCount: number
  postCount: number
}

export default function ComunidadesPage() {
  const [communities, setCommunities] = React.useState<Community[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    fetch('/api/communities')
      .then((r) => r.json())
      .then((data) => setCommunities(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = communities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const communityIcons: Record<string, string> = {
    Tarot: '🃏', Alquimia: '⚗️', Cabala: '✡️', Hermetismo: '📜',
    Astrologia: '⭐', 'Magia Cerimonial': '🔮', Gnosticismo: '👁️',
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Comunidades</h1>
              <p className="mt-2 text-[var(--color-text-secondary)]">
                Encontre grupos de estudo sobre tradições esotéricas
              </p>
            </div>
            <Button>Criar Comunidade</Button>
          </div>

          <div className="mb-8 relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <Input
              placeholder="Buscar comunidades..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 animate-pulse rounded-xl bg-[var(--color-bg-tertiary)]" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-[var(--color-text-secondary)] py-20">Nenhuma comunidade encontrada</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((community) => (
                <Card key={community.id} className="transition-all hover:border-[var(--color-primary)] hover:shadow-[var(--color-primary)]/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-bg-secondary)] text-2xl">
                        {communityIcons[community.name] || '📚'}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{community.name}</CardTitle>
                        <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {community.memberCount}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {community.postCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-sm text-[var(--color-text-secondary)]">
                      {community.description || 'Sem descrição'}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
