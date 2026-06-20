import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const before = searchParams.get('before')

    const where: any = { roomId: id, deleted: false }
    if (before) {
      where.createdAt = { lt: new Date(before) }
    }

    const messages = await db.message.findMany({
      where,
      include: {
        author: {
          select: { id: true, username: true, displayName: true, avatarUrl: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    return NextResponse.json({ data: messages.reverse() })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar mensagens' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { content, authorId, parentId } = body

    if (!content || !authorId) {
      return NextResponse.json({ error: 'Conteúdo e autor são obrigatórios' }, { status: 400 })
    }

    const message = await db.message.create({
      data: {
        roomId: id,
        authorId,
        parentId: parentId || null,
        body: content,
      },
      include: {
        author: {
          select: { id: true, username: true, displayName: true, avatarUrl: true },
        },
      },
    })

    return NextResponse.json({ data: message }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao enviar mensagem' }, { status: 500 })
  }
}
