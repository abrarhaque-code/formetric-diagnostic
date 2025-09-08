'use client'

import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-subtle' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-foreground">
              Formetric
            </div>
          </div>
          
          {/* Navigation - Hidden on mobile for simplicity */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-muted hover:text-foreground transition-colors">
              Pricing
            </a>
          </nav>
          
          {/* CTA Button */}
          <Button variant="primary" size="sm" className="hidden md:inline-flex">
            Get Started
          </Button>
          
          {/* Mobile menu button */}
          <Button variant="ghost" size="sm" className="md:hidden">
            Menu
          </Button>
        </div>
      </div>
    </header>
  )
}