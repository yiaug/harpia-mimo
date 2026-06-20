import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { userId, value } = body

    if (!userId || (value !== 1 && value !== -1)) {
      return NextResponse.json(
        { error: 'userId e value (1 ou -1) são obrigatórios' },
        { status: 400 }
      )
    }

    const existing = await db.vote.findUnique({
      where: {
        userId_entityType_entityId: {
          userId,
          entityType: 'post',
          entityId: id,
        },
      },
    })

    if (existing) {
      if (existing.value === value) {
        await db.vote.delete({ where: { id: existing.id } })
        const post = await db.post.findUnique({ where: { id } })
        return NextResponse.json({
          data: { voted: false, upvotes: post?.upvotes || 0, downvotes: post?.downvotes || 0 },
        })
      }

      await db.vote.update({
        where: { id: existing.id },
        data: { value },
      })

      if (value === 1) {
        await db.post.update({
          where: { id },
          data: { upvotes: { increment: 1 }, downvotes: { decrement: 1 } },
        })
      } else {
        await db.post.update({
          where: { id },
          data: { upvotes: { decrement: 1 }, downvotes: { increment: 1 } },
        })
      }
    } else {
      await db.vote.create({
        data: { userId, entityType: 'post', entityId: id, value },
      })

      if (value === 1) {
        await db.post.update({
          where: { id },
          data: { upvotes: { increment: 1 } },
        })
      } else {
        await db.post.update({
          where: { id },
          data: { downvotes: { increment: 1 } },
        })
      }
    }

    const post = await db.post.findUnique({ where: { id } })
    return NextResponse.json({
      data: { voted: true, value, upvotes: post?.upvotes || 0, downvotes: post?.downvotes || 0 },
    })
  } catch (error) {
    console.error('Error voting:', error)
    return NextResponse.json({ error: 'Erro ao votar' }, { status: 500 })
  }
}
