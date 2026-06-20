'use client'

import * as React from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/shared/navigation'
import { Footer } from '@/components/shared/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search, Plus, ArrowBigUp, ArrowBigDown, MessageCircle,
  Share2, Bookmark, Clock,
} from 'lucide-react'

interface Post {
  id: string
  title: string
  slug: string
  body: string | null
  upvotes: number
  downvotes: number
  commentCount: number
  createdAt: string
  author: { username: string; displayName: string | null } | null
  community: { name: string; slug: string }
}

interface Community {
  id: string
  name: string
  slug: string
}

export default function ForumPage() {
  const [posts, setPosts] = React.useState<Post[]>([])
  const [communities, setCommunities] = React.useState<Community[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState('')
  const [selectedCommunity, setSelectedCommunity] = React.useState('')
  const [sort, setSort] = React.useState('newest')
  const [page, setPage] = React.useState(1)

  React.useEffect(() => {
    async function fetchData() {
      try {
        const params = new URLSearchParams({ page: page.toString(), sort })
        if (search) params.set('search', search)
        if (selectedCommunity) params.set('community', selectedCommunity)

        const res = await fetch(`/api/forum?${params}`)
        const data = await res.json()
        setPosts(data.data || [])
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [page, sort, search, selectedCommunity])

  React.useEffect(() => {
    fetch('/api/communities')
      .then((r) => r.json())
      .then((data) => setCommunities(data.data || []))
      .catch(() => {})
  }, [])

  const communityColors: Record<string, string> = {
    Tarot: 'bg-purple-500/10 text-purple-400',
    Alquimia: 'bg-amber-500/10 text-amber-400',
    Cabala: 'bg-blue-500/10 text-blue-400',
    Hermetismo: 'bg-emerald-500/10 text-emerald-400',
    Astrologia: 'bg-cyan-500/10 text-cyan-400',
    'Magia Cerimonial': 'bg-rose-500/10 text-rose-400',
    Gnosticismo: 'bg-violet-500/10 text-violet-400',
  }

  function formatTimeAgo(date: string) {
    const diff = Date.now() - new Date(date).getTime()
    const minutes = Math.floor(diff / 60000)
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h`
    const days = Math.floor(hours / 24)
    return `${days}d`
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Fórum</h1>
              <p className="mt-2 text-[var(--color-text-secondary)]">
                Discussões sobre ocultismo e tradições esotéricas
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Post
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <Input
                  placeholder="Buscar posts..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                />
              </div>

              <Card>
                <div className="p-3">
                  <h3 className="mb-2 text-xs font-semibold uppercase text-[var(--color-text-muted)]">
                    Comunidades
                  </h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => { setSelectedCommunity(''); setPage(1) }}
                      className={`flex w-full items-center rounded-lg px-3 py-1.5 text-sm ${
                        !selectedCommunity ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
                      }`}
                    >
                      Todas
                    </button>
                    {communities.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => { setSelectedCommunity(c.slug); setPage(1) }}
                        className={`flex w-full items-center rounded-lg px-3 py-1.5 text-sm ${
                          selectedCommunity === c.slug ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-3">
                  <h3 className="mb-2 text-xs font-semibold uppercase text-[var(--color-text-muted)]">
                    Ordenar por
                  </h3>
                  <div className="space-y-1">
                    {[{ value: 'newest', label: 'Mais recentes' }, { value: 'top', label: 'Mais votados' }].map((s) => (
                      <button
                        key={s.value}
                        onClick={() => { setSort(s.value); setPage(1) }}
                        className={`flex w-full items-center rounded-lg px-3 py-1.5 text-sm ${
                          sort === s.value ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </aside>

            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-32 animate-pulse rounded-xl bg-[var(--color-bg-tertiary)]" />
                ))
              ) : posts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <MessageCircle className="mb-4 h-12 w-12 text-[var(--color-text-muted)]" />
                  <p className="text-lg text-[var(--color-text-secondary)]">Nenhum post encontrado</p>
                </div>
              ) : (
                posts.map((post) => (
                  <Card key={post.id} className="transition-all hover:border-[var(--color-border-hover)]">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-1">
                          <ArrowBigUp className="h-6 w-6 text-[var(--color-text-muted)]" />
                          <span className="text-sm font-medium">{post.upvotes - post.downvotes}</span>
                          <ArrowBigDown className="h-6 w-6 text-[var(--color-text-muted)]" />
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                            <span className="font-medium text-[var(--color-text-secondary)]">
                              {post.community.name}
                            </span>
                            <span>·</span>
                            <span>u/{post.author?.username || 'anônimo'}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTimeAgo(post.createdAt)}
                            </span>
                          </div>

                          <h3 className="text-lg font-semibold hover:text-[var(--color-primary)]">
                            <Link href={`/forum/post/${post.id}`}>{post.title}</Link>
                          </h3>

                          {post.body && (
                            <p className="line-clamp-2 text-sm text-[var(--color-text-secondary)]">
                              {post.body}
                            </p>
                          )}

                          <div className="flex items-center gap-4 pt-2">
                            <Badge variant="secondary" className={`text-xs ${communityColors[post.community.name] || ''}`}>
                              {post.community.name}
                            </Badge>
                            <span className="flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
                              <MessageCircle className="h-4 w-4" />
                              {post.commentCount} comentários
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
