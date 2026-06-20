import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const rooms = await db.room.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        _count: { select: { messages: true } },
      },
    })
    return NextResponse.json({ data: rooms })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar salas' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, type, createdById } = body

    if (!name) {
      return NextResponse.json({ error: 'Nome é obrigatório' }, { status: 400 })
    }

    const room = await db.room.create({
      data: { name, description, type: type || 'public', createdById },
    })

    return NextResponse.json({ data: room }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar sala' }, { status: 500 })
  }
}
