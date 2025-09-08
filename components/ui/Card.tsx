import { cn } from '@/lib/utils'
import { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = false, ...props }: CardProps) {
  const baseStyles = 'bg-white rounded-radius-card shadow-medium border border-gray-100'
  const hoverStyles = hover ? 'hover:shadow-premium hover:scale-[1.02] transition-all duration-200 cursor-pointer' : ''
  
  return (
    <div
      className={cn(
        baseStyles,
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn('p-spacing-card-mobile md:p-spacing-card', className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <div
      className={cn('px-spacing-card-mobile md:px-spacing-card pb-spacing-card-mobile md:pb-spacing-card', className)}
      {...props}
    >
      {children}
    </div>
  )
}