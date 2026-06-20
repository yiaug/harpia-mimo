'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  MessageSquare,
  Hash,
  Settings,
  FileText,
  Shield,
  Sparkles,
  ChevronLeft,
} from 'lucide-react'

const sidebarItems = [
  {
    label: 'Visão Geral',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Usuários',
    href: '/admin/users',
    icon: Users,
  },
  {
    label: 'Livros',
    href: '/admin/books',
    icon: BookOpen,
  },
  {
    label: 'Comunidades',
    href: '/admin/communities',
    icon: MessageSquare,
  },
  {
    label: 'Chat',
    href: '/admin/chat',
    icon: Hash,
  },
  {
    label: 'Logs de Auditoria',
    href: '/admin/logs',
    icon: FileText,
  },
  {
    label: 'Configurações',
    href: '/admin/settings',
    icon: Settings,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  return (
    <div className="flex min-h-screen bg-[var(--color-bg-primary)]">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] transition-all duration-200',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-16'
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-[var(--color-border-primary)] px-4">
          {sidebarOpen && (
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold">Admin</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:flex"
          >
            <ChevronLeft
              className={cn(
                'h-5 w-5 transition-transform',
                !sidebarOpen && 'rotate-180'
              )}
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]',
                    !sidebarOpen && 'justify-center px-2'
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-[var(--color-border-primary)] p-2">
          <Link
            href="/"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]',
              !sidebarOpen && 'justify-center px-2'
            )}
          >
            <Shield className="h-5 w-5 shrink-0" />
            {sidebarOpen && <span>Voltar ao Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          'flex-1 transition-all duration-200',
          sidebarOpen ? 'md:ml-64' : 'md:ml-16'
        )}
      >
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
