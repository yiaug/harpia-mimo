'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, BookOpen, MessageSquare, Clock, AlertTriangle } from 'lucide-react'

interface Stats {
  totalUsers: number
  totalBooks: number
  totalPosts: number
  totalMessages: number
  pendingUsers: number
  recentUsers: { id: string; username: string; createdAt: string; role: string }[]
}

export default function AdminDashboard() {
  const [stats, setStats] = React.useState<Stats | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((data) => setStats(data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const statCards = stats ? [
    { title: 'Usuários', value: stats.totalUsers, icon: Users, color: 'text-blue-400' },
    { title: 'Livros', value: stats.totalBooks, icon: BookOpen, color: 'text-emerald-400' },
    { title: 'Posts', value: stats.totalPosts, icon: MessageSquare, color: 'text-purple-400' },
    { title: 'Mensagens', value: stats.totalMessages, icon: MessageSquare, color: 'text-amber-400' },
  ] : []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">Visão geral da plataforma</p>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-[var(--color-bg-tertiary)]" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-4">
            {statCards.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-[var(--color-text-muted)]">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
            <Card>
              <CardHeader>
                <CardTitle>Usuários Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats?.recentUsers.map((u) => (
                    <div key={u.id} className="flex items-center justify-between rounded-lg border border-[var(--color-border-primary)] p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-bg-secondary)] text-xs">
                          {u.username[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{u.username}</p>
                          <p className="text-xs text-[var(--color-text-muted)]">
                            {new Date(u.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">{u.role}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {stats && stats.pendingUsers > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                    Ações Pendentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                    <p className="text-sm">{stats.pendingUsers} usuários aguardando aprovação</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  )
}
