import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  FileText,
  Search,
  Download,
  Clock,
  User,
  BookOpen,
  MessageSquare,
  Settings,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Logs de Auditoria - Admin',
}

const logs = [
  {
    id: '1',
    action: 'user.login',
    user: 'FilosofoNoturno',
    details: 'Login realizado com sucesso',
    ip: '192.168.1.100',
    timestamp: '2024-01-20 14:32:15',
    type: 'auth',
  },
  {
    id: '2',
    action: 'book.create',
    user: 'Admin',
    details: 'Livro "O Livro das Sombras" adicionado',
    ip: '192.168.1.1',
    timestamp: '2024-01-20 14:28:42',
    type: 'book',
  },
  {
    id: '3',
    action: 'post.remove',
    user: 'ModeradorX',
    details: 'Post removido por violação de regras',
    ip: '192.168.1.50',
    timestamp: '2024-01-20 14:15:33',
    type: 'moderation',
  },
  {
    id: '4',
    action: 'community.create',
    user: 'MestreAlquimista',
    details: 'Comunidade "Alquimia Avançada" criada',
    ip: '192.168.1.75',
    timestamp: '2024-01-20 13:45:21',
    type: 'community',
  },
  {
    id: '5',
    action: 'user.register',
    user: 'Sistema',
    details: 'Novo usuário registrado: NovoEstudante',
    ip: '192.168.1.120',
    timestamp: '2024-01-20 13:30:18',
    type: 'auth',
  },
  {
    id: '6',
    action: 'book.upload',
    user: 'Admin',
    details: 'PDF "A Doutrina Secreta" processado com sucesso',
    ip: '192.168.1.1',
    timestamp: '2024-01-20 12:15:44',
    type: 'book',
  },
]

const typeColors: Record<string, string> = {
  auth: 'bg-blue-500/10 text-blue-400',
  book: 'bg-emerald-500/10 text-emerald-400',
  moderation: 'bg-red-500/10 text-red-400',
  community: 'bg-purple-500/10 text-purple-400',
  chat: 'bg-amber-500/10 text-amber-400',
  system: 'bg-gray-500/10 text-gray-400',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const typeIcons: Record<string, any> = {
  auth: User,
  book: BookOpen,
  moderation: Settings,
  community: MessageSquare,
  chat: MessageSquare,
  system: Settings,
}

export default function AdminLogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Logs de Auditoria</h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            Histórico de ações na plataforma
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar Logs
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-[var(--color-text-muted)]">Logs Hoje</div>
            <div className="text-2xl font-bold">1,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-[var(--color-text-muted)]">Ações de Auth</div>
            <div className="text-2xl font-bold text-blue-400">892</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-[var(--color-text-muted)]">Moderações</div>
            <div className="text-2xl font-bold text-red-400">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-[var(--color-text-muted)]">Uploads</div>
            <div className="text-2xl font-bold text-emerald-400">45</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <Input placeholder="Buscar logs..." className="pl-10" />
        </div>
        <Button variant="outline">Todos</Button>
        <Button variant="outline">Autenticação</Button>
        <Button variant="outline">Livros</Button>
        <Button variant="outline">Moderação</Button>
      </div>

      {/* Logs List */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.map((log) => {
              const Icon = typeIcons[log.type] || Settings
              return (
                <div
                  key={log.id}
                  className="flex items-start gap-4 rounded-lg border border-[var(--color-border-primary)] p-4"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${typeColors[log.type] || ''}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={typeColors[log.type] || ''}>
                        {log.type}
                      </Badge>
                      <span className="text-sm font-medium">{log.action}</span>
                    </div>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                      {log.details}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {log.user}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {log.timestamp}
                      </span>
                      <span>IP: {log.ip}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="default" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Próximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
