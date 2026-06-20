'use client'

import * as React from 'react'
import { useSession } from 'next-auth/react'
import { Navigation } from '@/components/shared/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { getSocket } from '@/lib/socket'
import {
  Hash, Users, Plus, Settings, Send, Smile, MoreVertical,
  Volume2, Mic, MicOff, Headphones, HeadphoneOff, ChevronDown,
} from 'lucide-react'

interface Room {
  id: string
  name: string
  description: string | null
  type: string
  _count?: { messages: number }
}

interface Message {
  id: string
  body: string
  createdAt: string
  author: { id: string; username: string; displayName: string | null; avatarUrl: string | null } | null
}

export default function ChatPage() {
  const { data: session } = useSession()
  const user = session?.user as any

  const [rooms, setRooms] = React.useState<Room[]>([])
  const [selectedRoom, setSelectedRoom] = React.useState<string>('')
  const [messages, setMessages] = React.useState<Message[]>([])
  const [message, setMessage] = React.useState('')
  const [onlineUsers, setOnlineUsers] = React.useState<string[]>([])
  const [typingUsers, setTypingUsers] = React.useState<string[]>([])
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const typingTimeoutRef = React.useRef<NodeJS.Timeout>(undefined)

  React.useEffect(() => {
    fetch('/api/chat/rooms')
      .then((r) => r.json())
      .then((data) => {
        const roomList = data.data || []
        setRooms(roomList)
        if (roomList.length > 0 && !selectedRoom) {
          setSelectedRoom(roomList[0].id)
        }
      })
      .catch(() => {})
  }, [])

  React.useEffect(() => {
    if (!selectedRoom) return
    fetch(`/api/chat/rooms/${selectedRoom}/messages?limit=50`)
      .then((r) => r.json())
      .then((data) => setMessages(data.data || []))
      .catch(() => {})
  }, [selectedRoom])

  React.useEffect(() => {
    if (!selectedRoom) return
    const socket = getSocket()
    socket.emit('join-room', selectedRoom)

    socket.on('new-message', (msg: Message) => {
      setMessages((prev) => [...prev, msg])
    })

    socket.on('room-users', (users: string[]) => {
      setOnlineUsers(users)
    })

    socket.on('user-typing', (data: { user: string }) => {
      setTypingUsers((prev) => [...new Set([...prev, data.user])])
    })

    socket.on('user-stop-typing', (data: { user: string }) => {
      setTypingUsers((prev) => prev.filter((u) => u !== data.user))
    })

    return () => {
      socket.emit('leave-room', selectedRoom)
      socket.off('new-message')
      socket.off('room-users')
      socket.off('user-typing')
      socket.off('user-stop-typing')
    }
  }, [selectedRoom])

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend() {
    if (!message.trim() || !user?.id || !selectedRoom) return

    try {
      const res = await fetch(`/api/chat/rooms/${selectedRoom}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message, authorId: user.id }),
      })
      const data = await res.json()
      if (data.data) {
        const socket = getSocket()
        socket.emit('send-message', { roomId: selectedRoom, message: data.data })
      }
      setMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  function handleTyping() {
    if (!user?.id || !selectedRoom) return
    const socket = getSocket()
    socket.emit('typing', { roomId: selectedRoom, user: user.name || user.email })

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stop-typing', { roomId: selectedRoom, user: user.name || user.email })
    }, 2000)
  }

  const currentRoom = rooms.find((r) => r.id === selectedRoom)

  return (
    <div className="flex h-screen flex-col">
      <Navigation />
      <main className="flex flex-1 overflow-hidden">
        {/* Rooms Sidebar */}
        <div className="hidden w-60 flex-col border-r border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] md:flex">
          <div className="flex h-12 items-center justify-between border-b border-[var(--color-border-primary)] px-4">
            <h2 className="text-sm font-semibold">Canais</h2>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <div className="mb-4">
              <div className="flex items-center gap-1 px-2 py-1 text-xs font-semibold uppercase text-[var(--color-text-muted)]">
                <ChevronDown className="h-3 w-3" /> Canais de Texto
              </div>
              <div className="space-y-0.5">
                {rooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                      selectedRoom === room.id
                        ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    <Hash className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-left truncate">{room.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          {user && (
            <div className="border-t border-[var(--color-border-primary)] p-2">
              <div className="flex items-center gap-2 rounded-lg bg-[var(--color-bg-tertiary)] p-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm text-white">
                  {(user.name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                </div>
                <div className="flex-1 truncate">
                  <div className="text-sm font-medium">{user.name || user.email}</div>
                  <div className="text-xs text-green-400">Online</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Chat Area */}
        <div className="flex flex-1 flex-col">
          <div className="flex h-12 items-center justify-between border-b border-[var(--color-border-primary)] px-4">
            <div className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-[var(--color-text-muted)]" />
              <span className="font-semibold">{currentRoom?.name || 'Selecione uma sala'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--color-text-muted)]">
                {onlineUsers.length} online
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="group flex gap-4 hover:bg-[var(--color-bg-secondary)]/50 -mx-4 px-4 py-2 rounded-lg">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-tertiary)] text-sm text-white font-medium">
                    {(msg.author?.displayName?.[0] || msg.author?.username?.[0] || 'U').toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold">
                        {msg.author?.displayName || msg.author?.username || 'Anônimo'}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {new Date(msg.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-[var(--color-text-secondary)]">{msg.body}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {typingUsers.length > 0 && (
            <div className="px-4 py-1 text-xs text-[var(--color-text-muted)]">
              {typingUsers.join(', ')} {typingUsers.length === 1 ? 'está' : 'estão'} digitando...
            </div>
          )}

          <div className="border-t border-[var(--color-border-primary)] p-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder={user ? `Enviar mensagem para #${currentRoom?.name || ''}...` : 'Faça login para enviar mensagens'}
                value={message}
                onChange={(e) => { setMessage(e.target.value); handleTyping() }}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={!user}
              />
              <Button size="icon" onClick={handleSend} disabled={!message.trim() || !user}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
