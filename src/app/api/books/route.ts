import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '12')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const language = searchParams.get('language')
    const difficulty = searchParams.get('difficulty')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {}

    if (category) {
      where.categories = {
        some: {
          category: {
            slug: category,
          },
        },
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (language) {
      where.language = language
    }

    if (difficulty) {
      where.difficulty = difficulty
    }

    const [books, total] = await Promise.all([
      db.book.findMany({
        where,
        include: {
          categories: {
            include: {
              category: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
          ratings: {
            select: {
              rating: true,
            },
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      db.book.count({ where }),
    ])

    const booksWithAvgRating = books.map((book) => ({
      ...book,
      avgRating:
        book.ratings.length > 0
          ? book.ratings.reduce((acc, r) => acc + r.rating, 0) / book.ratings.length
          : 0,
    }))

    return NextResponse.json({
      data: booksWithAvgRating,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    })
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar livros' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, author, description, year, language, pages, difficulty, categoryIds, tagIds } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Título é obrigatório' },
        { status: 400 }
      )
    }

    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const book = await db.book.create({
      data: {
        title,
        slug,
        author,
        description,
        year: year ? parseInt(year) : null,
        language: language || 'pt-BR',
        pages: pages ? parseInt(pages) : null,
        difficulty: difficulty || 'intermediate',
        categories: categoryIds
          ? {
              create: categoryIds.map((id: string) => ({
                categoryId: id,
              })),
            }
          : undefined,
        tags: tagIds
          ? {
              create: tagIds.map((id: string) => ({
                tagId: id,
              })),
            }
          : undefined,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    return NextResponse.json({ data: book }, { status: 201 })
  } catch (error) {
    console.error('Error creating book:', error)
    return NextResponse.json(
      { error: 'Erro ao criar livro' },
      { status: 500 }
    )
  }
}
