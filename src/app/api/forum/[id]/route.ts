import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const post = await db.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, username: true, displayName: true, avatarUrl: true },
        },
        community: {
          select: { id: true, name: true, slug: true },
        },
        comments: {
          where: { parentId: null },
          include: {
            author: {
              select: { id: true, username: true, displayName: true, avatarUrl: true },
            },
            replies: {
              include: {
                author: {
                  select: { id: true, username: true, displayName: true, avatarUrl: true },
                },
              },
              orderBy: { createdAt: 'asc' },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 })
    }

    return NextResponse.json({ data: post })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json({ error: 'Erro ao buscar post' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, body: content } = body

    const post = await db.post.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content && { body: content }),
      },
    })

    return NextResponse.json({ data: post })
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json({ error: 'Erro ao atualizar post' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.post.delete({ where: { id } })
    return NextResponse.json({ data: { success: true } })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ error: 'Erro ao deletar post' }, { status: 500 })
  }
}
