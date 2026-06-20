import { Metadata } from 'next'
import { Navigation } from '@/components/shared/navigation'
import { Footer } from '@/components/shared/footer'

export const metadata: Metadata = {
  title: 'Termos de Uso - Harpia',
}

export default function TermosPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-[var(--color-text-secondary)]">
          <p>Última atualização: 20 de junho de 2026</p>

          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">1. Aceitação dos Termos</h2>
          <p>Ao acessar e utilizar a plataforma Harpia, você concorda com estes Termos de Uso. Se não concordar, não utilize a plataforma.</p>

          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">2. Descrição do Serviço</h2>
          <p>O Harpia é uma plataforma de estudos dedicada ao ocultismo, esoterismo, filosofia hermética, alquimia, magia, tarot, cabala e gnosticismo. Oferece biblioteca digital, fórum de discussão, chat e sistema de tarô.</p>

          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">3. Conta de Usuário</h2>
          <p>Para acessar determinados recursos, você precisa criar uma conta. Você é responsável por manter a confidencialidade de sua senha e por todas as atividades que ocorrem em sua conta.</p>

          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">4. Conduta do Usuário</h2>
          <p>Ao utilizar a plataforma, você concorda em:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Não publicar conteúdo ofensivo, spam ou ilegal</li>
            <li>Respeitar outros usuários e moderadores</li>
            <li>Não tentar acessar áreas restritas</li>
            <li>Não usar a plataforma para fins comerciais não autorizados</li>
          </ul>

          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">5. Propriedade Intelectual</h2>
          <p>Todo o conteúdo original da plataforma é protegido por direitos autorais. Livros e materiais de terceiros são de propriedade de seus respectivos autores.</p>

          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">6. Limitação de Responsabilidade</h2>
          <p>O Harpia é fornecido &quot;como está&quot;, sem garantias de qualquer tipo. Não nos responsabilizamos por danos decorrentes do uso da plataforma.</p>

          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">7. Alterações</h2>
          <p>Reservamo-nos o direito de alterar estes termos a qualquer momento. O uso continuado da plataforma após alterações constitui aceitação dos novos termos.</p>

          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">8. Contato</h2>
          <p>Em caso de dúvidas, entre em contato conosco.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
