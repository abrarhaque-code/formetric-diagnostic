'use client'

import { Button } from '@/components/ui/Button'
import { H1, BodyLarge, Small } from '@/components/ui/Typography'

export function Hero() {
  const handleGetStarted = () => {
    // Scroll to diagnostic section
    const diagnosticSection = document.getElementById('diagnostic')
    if (diagnosticSection) {
      diagnosticSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  return (
    <section className="relative min-h-screen flex flex-col px-6 md:px-12 lg:px-24 pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream to-gray-50 -z-10" />
      
      {/* Hero content - mobile-first with desktop enhancement */}
      <div className="flex-1 flex items-center justify-center -mt-10">
        <div className="w-full max-w-6xl mx-auto text-center">
          <H1 className="mb-6 md:mb-8">
            See your true
            <br />
            <span className="font-semibold text-signal-blue">
              unit economics
            </span>
            <br />
            <span className="font-light">in 10 minutes</span>
          </H1>
          
          <BodyLarge className="mb-8 md:mb-12 max-w-2xl mx-auto text-center">
            Join 50+ CPG brands getting investor-grade insights
          </BodyLarge>
          
          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-sm text-editorial-gray">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-success-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-success-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              2-minute setup
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA - fixed at bottom on mobile, inline on desktop */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/95 backdrop-blur-sm md:relative md:p-0 md:bg-transparent md:backdrop-blur-none z-40">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full md:w-auto md:mx-auto md:block"
            onClick={handleGetStarted}
          >
            Get Your Free Analysis →
          </Button>
          <Small className="text-center block mt-3 md:mt-4">
            Takes 2 minutes • No credit card required
          </Small>
        </div>
      </div>
      
      {/* Spacer for mobile fixed CTA */}
      <div className="h-24 md:h-0" />
    </section>
  )
}