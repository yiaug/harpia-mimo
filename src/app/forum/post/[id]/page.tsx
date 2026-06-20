'use client'

import * as React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Navigation } from '@/components/shared/navigation'
import { Footer } from '@/components/shared/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowBigUp, ArrowBigDown, MessageCircle, ChevronLeft, Clock } from 'lucide-react'

interface Comment {
  id: string
  body: string
  createdAt: string
  author: { username: string; displayName: string | null } | null
  replies?: Comment[]
}

interface Post {
  id: string
  title: string
  body: string | null
  upvotes: number
  downvotes: number
  commentCount: number
  createdAt: string
  author: { username: string; displayName: string | null } | null
  community: { name: string; slug: string }
  comments: Comment[]
}

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession()
  const [post, setPost] = React.useState<Post | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [comment, setComment] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)

  React.useEffect(() => {
    fetch(`/api/forum/${params.id}`)
      .then((r) => r.json())
      .then((data) => setPost(data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [params.id])

  async function handleComment(parentId?: string) {
    if (!comment.trim() || !session?.user) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/forum/${params.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: comment, authorId: (session.user as any).id, parentId }),
      })
      if (res.ok) {
        setComment('')
        const refresh = await fetch(`/api/forum/${params.id}`)
        const data = await refresh.json()
        setPost(data.data)
      }
    } finally {
      setSubmitting(false)
    }
  }

  function renderComment(c: Comment, depth = 0) {
    return (
      <div key={c.id} className={`${depth > 0 ? 'ml-6 border-l-2 border-[var(--color-border-primary)] pl-4' : ''}`}>
        <div className="rounded-lg bg-[var(--color-bg-tertiary)] p-3">
          <div className="mb-2 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <span className="font-medium text-[var(--color-text-secondary)]">u/{c.author?.username || 'anônimo'}</span>
            <span>·</span>
            <Clock className="h-3 w-3" />
            <span>{new Date(c.createdAt).toLocaleDateString('pt-BR')}</span>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">{c.body}</p>
        </div>
        {c.replies?.map((r) => renderComment(r, depth + 1))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="h-8 w-48 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
          <div className="mt-4 h-64 animate-pulse rounded-xl bg-[var(--color-bg-tertiary)]" />
        </main>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8 text-center">
          <p className="text-lg text-[var(--color-text-secondary)]">Post não encontrado</p>
          <Link href="/forum"><Button variant="outline" className="mt-4">Voltar ao Fórum</Button></Link>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link href="/forum" className="mb-6 flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
          <ChevronLeft className="h-4 w-4" /> Fórum
        </Link>

        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-1">
            <ArrowBigUp className="h-6 w-6 text-[var(--color-text-muted)]" />
            <span className="text-sm font-medium">{post.upvotes - post.downvotes}</span>
            <ArrowBigDown className="h-6 w-6 text-[var(--color-text-muted)]" />
          </div>

          <div className="flex-1">
            <div className="mb-3 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
              <Badge variant="secondary">{post.community.name}</Badge>
              <span>·</span>
              <span>u/{post.author?.username}</span>
              <span>·</span>
              <Clock className="h-3 w-3" />
              <span>{new Date(post.createdAt).toLocaleDateString('pt-BR')}</span>
            </div>

            <h1 className="mb-4 text-2xl font-bold">{post.title}</h1>
            {post.body && (
              <div className="mb-6 whitespace-pre-wrap text-[var(--color-text-secondary)] leading-relaxed">
                {post.body}
              </div>
            )}

            <div className="border-t border-[var(--color-border-primary)] pt-6">
              <h2 className="mb-4 text-lg font-semibold">
                <MessageCircle className="mr-2 inline h-5 w-5" />
                {post.commentCount} Comentários
              </h2>

              {session?.user ? (
                <div className="mb-6 flex gap-2">
                  <Input
                    placeholder="Escreva um comentário..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                  />
                  <Button onClick={() => handleComment()} disabled={!comment.trim() || submitting}>
                    {submitting ? '...' : 'Enviar'}
                  </Button>
                </div>
              ) : (
                <p className="mb-6 text-sm text-[var(--color-text-muted)]">
                  <Link href="/login" className="text-[var(--color-primary)] hover:underline">Faça login</Link> para comentar.
                </p>
              )}

              <div className="space-y-3">
                {post.comments.map((c) => renderComment(c))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
