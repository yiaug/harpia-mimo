import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  MessageSquare,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Users,
  FileText,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gerenciar Comunidades - Admin',
}

const communities = [
  {
    id: '1',
    name: 'Tarot',
    slug: 'tarot',
    description: 'Comunidade dedicada ao estudo e prática do Tarot',
    icon: '🃏',
    members: 2450,
    posts: 1230,
    status: 'active',
  },
  {
    id: '2',
    name: 'Alquimia',
    slug: 'alquimia',
    description: 'Discussões sobre alquimia espiritual e transmutação',
    icon: '⚗️',
    members: 1890,
    posts: 890,
    status: 'active',
  },
  {
    id: '3',
    name: 'Cabala',
    slug: 'cabala',
    description: 'Estudo da Cabala mística e filosófica',
    icon: '✡️',
    members: 2100,
    posts: 1050,
    status: 'active',
  },
  {
    id: '4',
    name: 'Hermetismo',
    slug: 'hermetismo',
    description: 'Filosofia hermética e seus ensinamentos',
    icon: '📜',
    members: 1650,
    posts: 720,
    status: 'active',
  },
  {
    id: '5',
    name: 'Astrologia',
    slug: 'astrologia',
    description: 'Astrologia oculta e tradicional',
    icon: '⭐',
    members: 2800,
    posts: 1560,
    status: 'active',
  },
  {
    id: '6',
    name: 'Magia Cerimonial',
    slug: 'magia-cerimonial',
    description: 'Prática e estudo da magia cerimonial',
    icon: '🔮',
    members: 1420,
    posts: 680,
    status: 'active',
  },
  {
    id: '7',
    name: 'Gnosticismo',
    slug: 'gnosticismo',
    description: 'Gnose e tradições gnósticas',
    icon: '👁️',
    members: 1780,
    posts: 840,
    status: 'active',
  },
]

export default function AdminCommunitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Comunidades</h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            Gerencie as comunidades da plataforma
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Criar Comunidade
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-[var(--color-text-muted)]">Total</div>
            <div className="text-2xl font-bold">7</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-[var(--color-text-muted)]">Membros Total</div>
            <div className="text-2xl font-bold">14,090</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-[var(--color-text-muted)]">Posts Total</div>
            <div className="text-2xl font-bold">6,970</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-[var(--color-text-muted)]">Ativas Hoje</div>
            <div className="text-2xl font-bold text-green-400">5</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <Input placeholder="Buscar comunidades..." className="pl-10" />
      </div>

      {/* Communities Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {communities.map((community) => (
          <Card key={community.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-bg-secondary)] text-2xl">
                    {community.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{community.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1 bg-green-500/10 text-green-400">
                      {community.status}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 line-clamp-2 text-sm text-[var(--color-text-secondary)]">
                {community.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {community.members.toLocaleString()} membros
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  {community.posts.toLocaleString()} posts
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
