'use client'

import * as React from 'react'
import { Navigation } from '@/components/shared/navigation'
import { Footer } from '@/components/shared/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sparkles, RotateCcw, Layers, Cross, Shuffle } from 'lucide-react'

interface TarotCard {
  id: string
  name: string
  arcana: string
  suit: string | null
  number: number | null
  meaningUpright: string
  meaningReversed: string
  keywords: string[]
  description: string | null
}

const spreads = [
  { id: 'single', name: 'Carta Única', description: 'Uma única carta para orientação rápida.', icon: Sparkles, cards: 1 },
  { id: 'three_cards', name: 'Três Cartas', description: 'Passado, Presente e Futuro.', icon: Layers, cards: 3 },
  { id: 'celtic_cross', name: 'Cruz Celta', description: 'A tiragem mais completa.', icon: Cross, cards: 10 },
]

export default function TarotPage() {
  const [allCards, setAllCards] = React.useState<TarotCard[]>([])
  const [selectedSpread, setSelectedSpread] = React.useState<string | null>(null)
  const [drawnCards, setDrawnCards] = React.useState<TarotCard[]>([])
  const [isShuffling, setIsShuffling] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch('/api/tarot')
      .then((r) => r.json())
      .then((data) => setAllCards(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  function handleDraw(spreadId: string) {
    setIsShuffling(true)
    setSelectedSpread(spreadId)
    const spread = spreads.find((s) => s.id === spreadId)
    const numCards = spread?.cards || 3

    setTimeout(() => {
      const shuffled = [...allCards].sort(() => Math.random() - 0.5)
      setDrawnCards(shuffled.slice(0, numCards))
      setIsShuffling(false)
    }, 1500)
  }

  const majorArcana = allCards.filter((c) => c.arcana === 'major')

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <Badge variant="secondary" className="mb-4">Sistema Tradicional de Tarô</Badge>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">Tarô</h1>
            <p className="mx-auto max-w-2xl text-[var(--color-text-secondary)]">
              {allCards.length} cartas disponíveis. Sem inteligência artificial - apenas sabedoria ancestral.
            </p>
          </div>

          {!selectedSpread ? (
            <>
              <div className="mb-12">
                <h2 className="mb-6 text-xl font-semibold">Escolha uma Tiragem</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {spreads.map((spread) => {
                    const Icon = spread.icon
                    return (
                      <Card key={spread.id} className="cursor-pointer transition-all hover:border-[var(--color-primary)] hover:shadow-[var(--color-primary)]/20" onClick={() => handleDraw(spread.id)}>
                        <CardHeader>
                          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                            <Icon className="h-6 w-6 text-[var(--color-primary)]" />
                          </div>
                          <CardTitle>{spread.name}</CardTitle>
                          <p className="text-sm text-[var(--color-text-secondary)]">{spread.description}</p>
                        </CardHeader>
                        <CardContent>
                          <Badge variant="secondary">{spread.cards} {spread.cards === 1 ? 'carta' : 'cartas'}</Badge>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {majorArcana.length > 0 && (
                <div>
                  <h2 className="mb-6 text-xl font-semibold">Arcanos Maiores ({majorArcana.length})</h2>
                  <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11">
                    {majorArcana.map((card) => (
                      <div key={card.id} className="flex flex-col items-center rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)] p-2 transition-all hover:border-[var(--color-primary)]">
                        <span className="text-xs font-medium text-center">{card.name}</span>
                        <span className="text-[10px] text-[var(--color-text-muted)]">{card.number}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-2xl font-bold">
                  {spreads.find((s) => s.id === selectedSpread)?.name}
                </h2>
                <p className="text-[var(--color-text-secondary)]">
                  {isShuffling ? 'Embaralhando as cartas...' : 'Suas cartas foram reveladas.'}
                </p>
              </div>

              <div className="mb-8 flex flex-wrap justify-center gap-6">
                {drawnCards.map((card, index) => (
                  <div key={card.id} className="flex flex-col items-center">
                    <div className={`flex h-48 w-32 flex-col items-center justify-center rounded-xl border-2 border-[var(--color-primary)] bg-gradient-to-b from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] p-4 shadow-lg transition-all ${isShuffling ? 'animate-pulse' : 'animate-in fade-in slide-in-from-bottom-4'}`} style={{ animationDelay: `${index * 200}ms` }}>
                      <span className="text-lg font-bold text-center">{card.name}</span>
                      <span className="mt-1 text-[10px] text-[var(--color-text-muted)]">{card.arcana === 'major' ? `Arcano ${card.number}` : card.suit}</span>
                    </div>
                    {selectedSpread === 'three_cards' && (
                      <span className="mt-2 text-xs text-[var(--color-text-muted)]">
                        {index === 0 ? 'Passado' : index === 1 ? 'Presente' : 'Futuro'}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => { setSelectedSpread(null); setDrawnCards([]) }}>
                  <RotateCcw className="mr-2 h-4 w-4" /> Nova Tiragem
                </Button>
                <Button onClick={() => handleDraw(selectedSpread!)}>
                  <Shuffle className="mr-2 h-4 w-4" /> Embaralhar Novamente
                </Button>
              </div>

              {!isShuffling && drawnCards.length > 0 && (
                <div className="mt-12">
                  <h3 className="mb-6 text-xl font-semibold">Significados</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {drawnCards.map((card) => (
                      <Card key={card.id}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">{card.name}</CardTitle>
                          <p className="text-xs text-[var(--color-text-muted)]">
                            {card.arcana === 'major' ? `Arcano Maior ${card.number}` : `${card.suit} - ${card.number}`}
                          </p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <h4 className="mb-1 text-sm font-medium text-green-400">Significado Positivo</h4>
                            <p className="text-sm text-[var(--color-text-secondary)]">{card.meaningUpright}</p>
                          </div>
                          <div>
                            <h4 className="mb-1 text-sm font-medium text-red-400">Significado Reverso</h4>
                            <p className="text-sm text-[var(--color-text-secondary)]">{card.meaningReversed}</p>
                          </div>
                          {card.keywords.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {card.keywords.map((kw) => (
                                <Badge key={kw} variant="outline" className="text-xs">{kw}</Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
