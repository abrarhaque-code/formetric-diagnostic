import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  className?: string
}

export function Button({ 
  variant = 'primary', 
  size = 'md',
  className,
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 ease-out disabled:opacity-50 disabled:pointer-events-none btn-hover-scale'
  
  const variants = {
    primary: 'bg-signal-blue text-white shadow-medium hover:shadow-premium',
    ghost: 'bg-transparent text-foreground border-2 border-gray-300 hover:border-signal-blue hover:text-signal-blue',
    outline: 'bg-transparent text-signal-blue border-2 border-signal-blue hover:bg-signal-blue hover:text-white'
  }
  
  const sizes = {
    sm: 'px-6 py-3 text-base rounded-radius-button',
    md: 'px-8 py-4 text-lg rounded-radius-button',
    lg: 'px-10 py-5 text-lg md:text-xl rounded-radius-button'
  }
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}