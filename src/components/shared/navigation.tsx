'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  MessageSquare,
  Layers,
  Hash,
  Sparkles,
  Menu,
  X,
  Search,
  Bell,
  LogOut,
  User,
  Shield,
} from 'lucide-react'

const navItems = [
  { href: '/biblioteca', label: 'Biblioteca', icon: BookOpen },
  { href: '/forum', label: 'Fórum', icon: MessageSquare },
  { href: '/tarot', label: 'Tarô', icon: Sparkles },
  { href: '/chat', label: 'Chat', icon: Hash },
  { href: '/comunidades', label: 'Comunidades', icon: Layers },
]

export function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [userMenuOpen, setUserMenuOpen] = React.useState(false)

  const user = session?.user as any

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-bg-secondary)]/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[var(--color-text-primary)]">
              Harpia
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>

          {session ? (
            <>
              <Button variant="ghost" size="icon" className="hidden sm:flex relative">
                <Bell className="h-5 w-5" />
              </Button>

              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-medium text-white hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                  {user?.image ? (
                    <img src={user.image} alt="" className="h-8 w-8 rounded-full" />
                  ) : (
                    (user?.name?.[0] || user?.email?.[0] || 'U').toUpperCase()
                  )}
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)] shadow-lg">
                    <div className="border-b border-[var(--color-border-primary)] p-3">
                      <p className="text-sm font-medium">{user?.name || user?.email}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{user?.email}</p>
                      {user?.role && (
                        <p className="mt-1 text-xs text-[var(--color-primary)] capitalize">{user.role}</p>
                      )}
                    </div>
                    <div className="p-1">
                      <Link
                        href="/perfil"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
                      >
                        <User className="h-4 w-4" />
                        Meu Perfil
                      </Link>
                      {(user?.role === 'admin' || user?.role === 'super_admin') && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
                        >
                          <Shield className="h-4 w-4" />
                          Admin
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          setUserMenuOpen(false)
                          signOut({ callbackUrl: '/' })
                        }}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
                      >
                        <LogOut className="h-4 w-4" />
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">Entrar</Link>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]">
          <nav className="container mx-auto flex flex-col gap-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
