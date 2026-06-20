import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const [totalUsers, totalBooks, totalPosts, totalMessages] = await Promise.all([
      db.user.count(),
      db.book.count(),
      db.post.count(),
      db.message.count(),
    ])

    const recentUsers = await db.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, username: true, createdAt: true, role: true },
    })

    const pendingUsers = await db.user.count({ where: { status: 'pending' } })

    return NextResponse.json({
      data: {
        totalUsers,
        totalBooks,
        totalPosts,
        totalMessages,
        pendingUsers,
        recentUsers,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar stats' }, { status: 500 })
  }
}
