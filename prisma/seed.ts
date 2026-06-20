import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  errorFormat: 'colorless',
})

async function main() {
  console.log('🌱 Seeding database...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'tarot' },
      update: {},
      create: {
        name: 'Tarot',
        slug: 'tarot',
        description: 'Estudo e prática do Tarot',
        icon: 'tarot',
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'alquimia' },
      update: {},
      create: {
        name: 'Alquimia',
        slug: 'alquimia',
        description: 'Alquimia espiritual e transmutação',
        icon: 'flask',
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'cabala' },
      update: {},
      create: {
        name: 'Cabala',
        slug: 'cabala',
        description: 'Cabala mística e árvore da vida',
        icon: 'tree',
        sortOrder: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'hermetismo' },
      update: {},
      create: {
        name: 'Hermetismo',
        slug: 'hermetismo',
        description: 'Filosofia hermética',
        icon: 'scroll',
        sortOrder: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'astrologia' },
      update: {},
      create: {
        name: 'Astrologia',
        slug: 'astrologia',
        description: 'Astrologia oculta e tradicional',
        icon: 'star',
        sortOrder: 5,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'magia-cerimonial' },
      update: {},
      create: {
        name: 'Magia Cerimonial',
        slug: 'magia-cerimonial',
        description: 'Magia cerimonial e rituais',
        icon: 'wand',
        sortOrder: 6,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'gnosticismo' },
      update: {},
      create: {
        name: 'Gnosticismo',
        slug: 'gnosticismo',
        description: 'Gnose e gnosticismo antigo',
        icon: 'eye',
        sortOrder: 7,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'filosofia' },
      update: {},
      create: {
        name: 'Filosofia',
        slug: 'filosofia',
        description: 'Filosofia oculta e mística',
        icon: 'book',
        sortOrder: 8,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'simbolismo' },
      update: {},
      create: {
        name: 'Simbolismo',
        slug: 'simbolismo',
        description: 'Símbolos e alegorias sagradas',
        icon: 'shapes',
        sortOrder: 9,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'meditacao' },
      update: {},
      create: {
        name: 'Meditação',
        slug: 'meditacao',
        description: 'Práticas meditativas e contemplativas',
        icon: 'lotus',
        sortOrder: 10,
      },
    }),
  ])

  console.log(`✅ Created ${categories.length} categories`)

  // Create Major Arcana
  const majorArcana = [
    { name: 'O Louco', number: 0, meaningUpright: 'Novos começos, espontaneidade, inocência, liberdade, aventura', meaningReversed: 'Imprudência, risco, hesitação, tolice, descontrole', keywords: ['novos começos', 'aventura', 'liberdade'], description: 'O arcano supremo do potencial e da novidade' },
    { name: 'O Mago', number: 1, meaningUpright: 'Manifestação, poder pessoal, habilidade, determinação', meaningReversed: 'Manipulação, engano, falta de habilidade', keywords: ['poder', 'manifestação', 'criação'], description: 'O mestre da manifestação e do poder pessoal' },
    { name: 'A Sacerdotisa', number: 2, meaningUpright: 'Intuição, sabedoria oculta, mistérios, subconsciente', meaningReversed: 'Segredos revelados, superficialidade, falta de intuição', keywords: ['intuição', 'mistério', 'sabedoria'], description: 'A guardiã dos mistérios e da sabedoria interior' },
    { name: 'A Imperatriz', number: 3, meaningUpright: 'Abundância, fertilidade, natureza, feminino sagrado', meaningReversed: 'Dependência, vazio criativo, infertilidade', keywords: ['abundância', 'natureza', 'criatividade'], description: 'A personificação da abundância e fertilidade' },
    { name: 'O Imperador', number: 4, meaningUpright: 'Autoridade, estrutura, ordem, liderança', meaningReversed: 'Tirania, rigidez, controle excessivo', keywords: ['autoridade', 'estrutura', 'liderança'], description: 'O arquétipo da autoridade e ordem' },
    { name: 'O Hierofante', number: 5, meaningUpright: 'Tradição, ensino, espiritualidade, conformidade', meaningReversed: 'Rebeldia, desafio, liberalidade', keywords: ['tradição', 'ensino', 'espiritualidade'], description: 'O mestre espiritual e ensinador' },
    { name: 'Os Enamorados', number: 6, meaningUpright: 'Amor, harmonia, escolhas, relações', meaningReversed: 'Disharmonia, desequilíbrio, mau julgamento', keywords: ['amor', 'harmonia', 'escolhas'], description: 'A união de opostos e escolhas do coração' },
    { name: 'O Carro', number: 7, meaningUpright: 'Vitória, determinação, ambição, autocontrole', meaningReversed: 'Falta de direção, agressão, derrota', keywords: ['vitória', 'determinação', 'conquista'], description: 'O vitorioso que supera obstáculos pela vontade' },
    { name: 'A Força', number: 8, meaningUpright: 'Coragem, paciência, controle interno, compaixão', meaningReversed: 'Fragilidade, dúvida, fraqueza', keywords: ['coragem', 'paciência', 'força interior'], description: 'A força interior que doma a besta' },
    { name: 'O Eremita', number: 9, meaningUpright: 'Solidão, introspecção, sabedoria, busca interior', meaningReversed: 'Isolamento, solidão negativa, fuga', keywords: ['introspecção', 'sabedoria', 'busca'], description: 'O buscador da verdade na solidão' },
    { name: 'A Roda da Fortuna', number: 10, meaningUpright: 'Mudança, ciclos, destino, sorte', meaningReversed: 'Mau humor, resistência à mudança', keywords: ['mudança', 'ciclos', 'destino'], description: 'Os ciclos inevitáveis da vida' },
    { name: 'A Justiça', number: 11, meaningUpright: 'Equilíbrio, verdade, lei, karma', meaningReversed: 'Injustiça, desonestidade, desequilíbrio', keywords: ['justiça', 'verdade', 'karma'], description: 'A balança da verdade e equilíbrio' },
    { name: 'O Enforcado', number: 12, meaningUpright: 'Sacrifício, novo ângulo, pausa, entrega', meaningReversed: 'Egoísmo, vitimismo, estagnação', keywords: ['sacrifício', 'perspectiva', 'entrega'], description: 'A transformação através do sacrifício' },
    { name: 'A Morte', number: 13, meaningUpright: 'Transformação, fim de ciclo, transição, renovação', meaningReversed: 'Resistência à mudança, estagnação', keywords: ['transformação', 'transição', 'renovação'], description: 'O fim necessário para o novo começo' },
    { name: 'A Temperança', number: 14, meaningUpright: 'Equilíbrio, paciência, moderação, cura', meaningReversed: 'Desequilíbrio, excesso, impaciência', keywords: ['equilíbrio', 'moderação', 'cura'], description: 'A harmonia dos opostos e a cura' },
    { name: 'O Diabo', number: 15, meaningUpright: 'Tentação, vícios, materialismo, sombras', meaningReversed: 'Liberdade, desapego, quebra de correntes', keywords: ['tentação', 'vícios', 'sombras'], description: 'Os grilhões que nos prendem ao material' },
    { name: 'A Torre', number: 16, meaningUpright: 'Ruptura, revelação, caos, libertação', meaningReversed: 'Medo de mudança, resistência', keywords: ['ruptura', 'revelação', 'libertação'], description: 'A queda necessária para reconstrução' },
    { name: 'A Estrela', number: 17, meaningUpright: 'Esperança, inspiração, serenidade, renovação', meaningReversed: 'Desespero, falta de fé, desilusão', keywords: ['esperança', 'inspiração', 'renovação'], description: 'A luz após a tempestade' },
    { name: 'A Lua', number: 18, meaningUpright: 'Ilusão, medo, subconsciente, intuição', meaningReversed: 'Clareza, verdade revelada', keywords: ['ilusão', 'subconsciente', 'mistério'], description: 'Os labirintos da mente e do subconsciente' },
    { name: 'O Sol', number: 19, meaningUpright: 'Alegria, êxito, vitalidade, otimismo', meaningReversed: 'Tristeza, fracasso, pessimismo', keywords: ['alegria', 'êxito', 'vitalidade'], description: 'A luz plena da consciência e realização' },
    { name: 'O Julgamento', number: 20, meaningUpright: 'Renascimento, chamado, despertar, avaliação', meaningReversed: 'Dúvida, recusa, auto-crítica', keywords: ['renascimento', 'despertar', 'chamado'], description: 'O despertar da alma para sua verdadeira vocação' },
    { name: 'O Mundo', number: 21, meaningUpright: 'Completude, realização, integração, ciclo', meaningReversed: 'Incompletude, falha, falta de closure', keywords: ['completude', 'realização', 'integração'], description: 'O fechamento do ciclo e a totalidade' },
  ]

  for (const card of majorArcana) {
    const existing = await prisma.tarotCard.findFirst({
      where: { arcana: 'major', number: card.number },
    })
    if (!existing) {
      await prisma.tarotCard.create({
        data: {
          name: card.name,
          arcana: 'major',
          number: card.number,
          meaningUpright: card.meaningUpright,
          meaningReversed: card.meaningReversed,
          keywords: card.keywords,
          description: card.description,
          sortOrder: card.number,
        },
      })
    }
  }

  console.log(`✅ Created ${majorArcana.length} Major Arcana cards`)

  // Create communities
  const communities = [
    { name: 'Tarot', slug: 'tarot', description: 'Comunidade dedicada ao estudo e prática do Tarot' },
    { name: 'Alquimia', slug: 'alquimia', description: 'Discussões sobre alquimia espiritual e transmutação' },
    { name: 'Cabala', slug: 'cabala', description: 'Estudo da Cabala mística e filosófica' },
    { name: 'Hermetismo', slug: 'hermetismo', description: 'Filosofia hermética e seus ensinamentos' },
    { name: 'Astrologia', slug: 'astrologia', description: 'Astrologia oculta e tradicional' },
    { name: 'Magia Cerimonial', slug: 'magia-cerimonial', description: 'Prática e estudo da magia cerimonial' },
    { name: 'Gnosticismo', slug: 'gnosticismo', description: 'Gnose e tradições gnósticas' },
  ]

  for (const community of communities) {
    await prisma.community.upsert({
      where: { slug: community.slug },
      update: {},
      create: community,
    })
  }

  console.log(`✅ Created ${communities.length} communities`)

  // Create default rooms
  const rooms = [
    { name: 'geral', description: 'Chat geral da comunidade' },
    { name: 'tarot-discussao', description: 'Discussões sobre Tarot' },
    { name: 'meditacao', description: 'Espaço para meditação e contemplação' },
  ]

  for (const room of rooms) {
    const existing = await prisma.room.findFirst({
      where: { name: room.name },
    })
    if (!existing) {
      await prisma.room.create({
        data: room,
      })
    }
  }

  console.log(`✅ Created ${rooms.length} rooms`)

  // Create Minor Arcana
  const suits = [
    { name: 'Copas', suit: 'cups', element: 'Água', keywords: ['emoções', 'relações', 'intuição'] },
    { name: 'Espadas', suit: 'swords', element: 'Ar', keywords: ['mente', 'comunicação', 'conflito'] },
    { name: 'Paus', suit: 'wands', element: 'Fogo', keywords: ['ação', 'criação', 'paixão'] },
    { name: 'Ouros', suit: 'pentacles', element: 'Terra', keywords: ['material', 'trabalho', 'abundância'] },
  ]

  const pipNames = ['Ás', 'Dois', 'Três', 'Quatro', 'Cinco', 'Seis', 'Sete', 'Oito', 'Nove', 'Dez']
  const courtNames = ['Pajeete', 'Cavaleiro', 'Rainha', 'Rei']

  let minorCount = 0
  for (const suit of suits) {
    for (let i = 0; i < 14; i++) {
      const number = i + 1
      const name = i < 10 ? `${pipNames[i]} de ${suit.name}` : `${courtNames[i - 1]} de ${suit.name}`
      const existing = await prisma.tarotCard.findFirst({
        where: { arcana: 'minor', suit: suit.suit, number },
      })
      if (!existing) {
        await prisma.tarotCard.create({
          data: {
            name,
            arcana: 'minor',
            suit: suit.suit,
            number,
            meaningUpright: `${name} - Significado positivo na tradição de ${suit.name}`,
            meaningReversed: `${name} - Significado reverso na tradição de ${suit.name}`,
            keywords: suit.keywords,
            description: `${name} do naipe de ${suit.name}, elemento ${suit.element}`,
            sortOrder: 22 + (suits.indexOf(suit) * 14) + i,
          },
        })
        minorCount++
      }
    }
  }

  console.log(`✅ Created ${minorCount} Minor Arcana cards`)

  // Create sample books
  const sampleBooks = [
    { title: 'O Livro das Sombras', author: 'Dores N. Knott', description: 'Um guia completo sobre a tradição wiccana e a criação do Livro das Sombras.', year: 1998, pages: 320, difficulty: 'intermediate', category: 'magia-cerimonial' },
    { title: 'A Doutrina Secreta', author: 'Helena Blavatsky', description: 'Obra fundamental da teosofia, explorando os mistérios arcanos da humanidade.', year: 1888, pages: 1456, difficulty: 'advanced', category: 'filosofia' },
    { title: 'O Alquimista', author: 'Paulo Coelho', description: 'Uma alegoria sobre a busca pelo tesouro interior e a realização pessoal.', year: 1988, pages: 208, difficulty: 'beginner', category: 'alquimia' },
    { title: 'Tarot e Cabala', author: 'Paul Foster Case', description: 'A relação profunda entre o Tarot e a Cabala mística.', year: 1947, pages: 280, difficulty: 'intermediate', category: 'tarot' },
    { title: 'Os Sete Éons', author: 'Samael Aun Weor', description: 'Estudo gnóstico dos sete estágios da evolução da consciência.', year: 1975, pages: 250, difficulty: 'intermediate', category: 'gnosticismo' },
    { title: 'Meditações Herméticas', author: 'Robert Allen Bartlett', description: 'Práticas meditativas baseadas nos princípios herméticos.', year: 2010, pages: 180, difficulty: 'beginner', category: 'hermetismo' },
    { title: 'O Kybalion', author: 'Os Três Iniciados', description: 'Os sete princípios herméticos de Thoth Hermes Trismegisto.', year: 1908, pages: 140, difficulty: 'beginner', category: 'hermetismo' },
    { title: 'A Cabala Mística', author: 'Israel Regardie', description: 'Introdução completa à Cabala para o praticante moderno.', year: 1932, pages: 350, difficulty: 'intermediate', category: 'cabala' },
    { title: 'O Livro da Lei', author: 'Aleister Crowley', description: 'O texto sagrado da religião Thelema, recebido em 1904.', year: 1904, pages: 68, difficulty: 'advanced', category: 'magia-cerimonial' },
    { title: 'Astrologia Hermética', author: 'Dane Rudhyar', description: 'Uma abordagem espiritual e psicológica da astrologia.', year: 1936, pages: 320, difficulty: 'intermediate', category: 'astrologia' },
  ]

  for (const book of sampleBooks) {
    const slug = book.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const existing = await prisma.book.findFirst({ where: { slug } })
    if (!existing) {
      const created = await prisma.book.create({
        data: {
          title: book.title,
          slug,
          author: book.author,
          description: book.description,
          year: book.year,
          pages: book.pages,
          difficulty: book.difficulty,
          language: 'pt-BR',
        },
      })
      const category = await prisma.category.findUnique({ where: { slug: book.category } })
      if (category) {
        await prisma.bookCategory.create({
          data: { bookId: created.id, categoryId: category.id },
        })
      }
    }
  }

  console.log(`✅ Created ${sampleBooks.length} sample books`)

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
