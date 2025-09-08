import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/sections/Hero'

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      
      {/* Placeholder for diagnostic section */}
      <section id="diagnostic" className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Diagnostic Tool</h2>
          <p className="text-muted">Coming next...</p>
        </div>
      </section>
    </main>
  )
}
