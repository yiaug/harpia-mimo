import { createServer } from 'http'
import { Server } from 'socket.io'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handle(req, res)
  })

  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NEXTAUTH_URL || '*',
      methods: ['GET', 'POST'],
    },
  })

  const rooms = new Map<string, Set<string>>()

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on('join-room', (roomId: string) => {
      socket.join(roomId)
      if (!rooms.has(roomId)) rooms.set(roomId, new Set())
      rooms.get(roomId)!.add(socket.id)

      const users = Array.from(rooms.get(roomId) || [])
      io.to(roomId).emit('room-users', users)
    })

    socket.on('leave-room', (roomId: string) => {
      socket.leave(roomId)
      rooms.get(roomId)?.delete(socket.id)

      const users = Array.from(rooms.get(roomId) || [])
      io.to(roomId).emit('room-users', users)
    })

    socket.on('send-message', (data: { roomId: string; message: any }) => {
      io.to(data.roomId).emit('new-message', data.message)
    })

    socket.on('typing', (data: { roomId: string; user: string }) => {
      socket.to(data.roomId).emit('user-typing', data)
    })

    socket.on('stop-typing', (data: { roomId: string; user: string }) => {
      socket.to(data.roomId).emit('user-stop-typing', data)
    })

    socket.on('disconnect', () => {
      rooms.forEach((users, roomId) => {
        if (users.has(socket.id)) {
          users.delete(socket.id)
          io.to(roomId).emit('room-users', Array.from(users))
        }
      })
    })
  })

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
