'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Shield, Ban, MoreVertical } from 'lucide-react'

interface User {
  id: string
  username: string
  email: string
  role: string
  status: string
  createdAt: string
  _count: { posts: number; comments: number }
}

export default function AdminUsersPage() {
  const [users, setUsers] = React.useState<User[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    fetch('/api/admin/users')
      .then((r) => r.json())
      .then((data) => setUsers(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const roleColors: Record<string, string> = {
    user: 'bg-gray-500/10 text-gray-400',
    verified_member: 'bg-blue-500/10 text-blue-400',
    moderator: 'bg-purple-500/10 text-purple-400',
    admin: 'bg-amber-500/10 text-amber-400',
    super_admin: 'bg-red-500/10 text-red-400',
  }

  const statusColors: Record<string, string> = {
    active: 'bg-green-500/10 text-green-400',
    pending: 'bg-yellow-500/10 text-yellow-400',
    suspended: 'bg-orange-500/10 text-orange-400',
    banned: 'bg-red-500/10 text-red-400',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Usuários</h1>
        <p className="text-[var(--color-text-secondary)]">{users.length} total</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <Input
          placeholder="Buscar usuários..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
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
                    <th className="pb-3 text-left font-medium text-[var(--color-text-muted)]">Usuário</th>
                    <th className="pb-3 text-left font-medium text-[var(--color-text-muted)]">Email</th>
                    <th className="pb-3 text-left font-medium text-[var(--color-text-muted)]">Papel</th>
                    <th className="pb-3 text-left font-medium text-[var(--color-text-muted)]">Status</th>
                    <th className="pb-3 text-left font-medium text-[var(--color-text-muted)]">Atividade</th>
                    <th className="pb-3 text-right font-medium text-[var(--color-text-muted)]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => (
                    <tr key={user.id} className="border-b border-[var(--color-border-primary)] last:border-0">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-bg-secondary)] text-xs">
                            {user.username[0].toUpperCase()}
                          </div>
                          <span className="font-medium">{user.username}</span>
                        </div>
                      </td>
                      <td className="py-4 text-[var(--color-text-secondary)]">{user.email}</td>
                      <td className="py-4">
                        <Badge variant="secondary" className={roleColors[user.role] || ''}>{user.role}</Badge>
                      </td>
                      <td className="py-4">
                        <Badge variant="secondary" className={statusColors[user.status] || ''}>{user.status}</Badge>
                      </td>
                      <td className="py-4 text-[var(--color-text-secondary)]">
                        {user._count.posts} posts, {user._count.comments} comments
                      </td>
                      <td className="py-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Shield className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Ban className="h-4 w-4" />
                        </Button>
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
