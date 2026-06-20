import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const room = await db.room.findUnique({ where: { id } })
    if (!room) {
      return NextResponse.json({ error: 'Sala não encontrada' }, { status: 404 })
    }
    return NextResponse.json({ data: room })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar sala' }, { status: 500 })
  }
}
