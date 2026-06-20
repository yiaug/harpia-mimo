import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { userId, rating, review } = body

    if (!userId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'userId e rating (1-5) são obrigatórios' },
        { status: 400 }
      )
    }

    const existing = await db.bookRating.findUnique({
      where: { userId_bookId: { userId, bookId: id } },
    })

    let bookRating
    if (existing) {
      bookRating = await db.bookRating.update({
        where: { id: existing.id },
        data: { rating, review },
      })
    } else {
      bookRating = await db.bookRating.create({
        data: { userId, bookId: id, rating, review },
      })
    }

    const ratings = await db.bookRating.findMany({ where: { bookId: id } })
    const avgRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length

    await db.book.update({
      where: { id },
      data: { ratingAvg: avgRating, ratingCount: ratings.length },
    })

    return NextResponse.json({ data: bookRating })
  } catch (error) {
    console.error('Error rating book:', error)
    return NextResponse.json({ error: 'Erro ao avaliar livro' }, { status: 500 })
  }
}
