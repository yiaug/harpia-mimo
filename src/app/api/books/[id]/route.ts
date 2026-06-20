import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const book = await db.book.findUnique({
      where: { id },
      include: {
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
        ratings: {
          include: {
            user: { select: { id: true, username: true, displayName: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
        creator: { select: { id: true, username: true, displayName: true } },
      },
    })

    if (!book) {
      return NextResponse.json({ error: 'Livro não encontrado' }, { status: 404 })
    }

    return NextResponse.json({ data: book })
  } catch (error) {
    console.error('Error fetching book:', error)
    return NextResponse.json({ error: 'Erro ao buscar livro' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const book = await db.book.update({ where: { id }, data: body })
    return NextResponse.json({ data: book })
  } catch (error) {
    console.error('Error updating book:', error)
    return NextResponse.json({ error: 'Erro ao atualizar livro' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.book.delete({ where: { id } })
    return NextResponse.json({ data: { success: true } })
  } catch (error) {
    console.error('Error deleting book:', error)
    return NextResponse.json({ error: 'Erro ao deletar livro' }, { status: 500 })
  }
}
