import { Metadata } from 'next'
import { Navigation } from '@/components/shared/navigation'
import { Footer } from '@/components/shared/footer'

export const metadata: Metadata = {
  title: 'Política de Privacidade - Harpia',
}

export default function PrivacidadePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-[var(--color-text-secondary)]">
          <p>Última atualização: 20 de junho de 2026</p>

          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">1. Informações Coletadas</h2>
          <p>Coletamos as seguintes informações:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Dados de cadastro (nome, email, senha criptografada)</li>
            <li>Dados de uso (posts, comentários, leituras)</li>
            <li>Informações de dispositivo e IP para segurança</li>
          </ul>

          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">2. Uso das Informações</h2>
          <p>Utilizamos suas informações para:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Providenciar e melhorar nossos serviços</li>
            <li>Personalizar sua experiência</li>
            <li>Garantir a segurança da plataforma</li>
            <li>Comunicar atualizações importantes</li>
          </ul>

          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">3. Compartilhamento</h2>
          <p>Não vendemos nem compartilhamos suas informações pessoais com terceiros, exceto quando exigido por lei.</p>

          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">4. Segurança</h2>
          <p>Empregamos medidas de segurança para proteger suas informações, incluindo criptografia de senhas e HTTPS.</p>

          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">5. Seus Direitos</h2>
          <p>Você pode:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Acessar seus dados pessoais</li>
            <li>Solicitar correção de dados incorretos</li>
            <li>Solicitar exclusão de sua conta</li>
            <li>Exportar seus dados</li>
          </ul>

          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">6. Cookies</h2>
          <p>Utilizamos cookies essenciais para o funcionamento da plataforma e cookies analíticos para melhorar a experiência.</p>

          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">7. Contato</h2>
          <p>Em caso de dúvidas sobre esta política, entre em contato conosco.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
