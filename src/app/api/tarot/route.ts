import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const cards = await db.tarotCard.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
    })

    return NextResponse.json({ data: cards })
  } catch (error) {
    console.error('Error fetching tarot cards:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar cartas do tarot' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { spreadType, cardIds, userId, notes } = body

    if (!spreadType || !cardIds || !userId) {
      return NextResponse.json(
        { error: 'Tipo de tiragem, cartas e usuário são obrigatórios' },
        { status: 400 }
      )
    }

    const cards = await db.tarotCard.findMany({
      where: {
        id: {
          in: cardIds,
        },
      },
    })

    if (cards.length !== cardIds.length) {
      return NextResponse.json(
        { error: 'Uma ou mais cartas inválidas' },
        { status: 400 }
      )
    }

    const draw = await db.tarotDraw.create({
      data: {
        userId,
        spreadType,
        cards,
        notes,
      },
    })

    return NextResponse.json({ data: draw }, { status: 201 })
  } catch (error) {
    console.error('Error creating tarot draw:', error)
    return NextResponse.json(
      { error: 'Erro ao criar tiragem' },
      { status: 500 }
    )
  }
}
