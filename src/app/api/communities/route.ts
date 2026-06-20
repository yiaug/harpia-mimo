import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const communities = await db.community.findMany({
      orderBy: { memberCount: 'desc' },
    })
    return NextResponse.json({ data: communities })
  } catch (error) {
    console.error('Error fetching communities:', error)
    return NextResponse.json({ error: 'Erro ao buscar comunidades' }, { status: 500 })
  }
}
