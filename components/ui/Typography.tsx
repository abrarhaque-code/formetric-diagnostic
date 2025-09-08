import { cn } from '@/lib/utils'
import { HTMLAttributes, ReactNode } from 'react'

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  className?: string
}

export function H1({ children, className, ...props }: TypographyProps) {
  return (
    <h1
      className={cn(
        'text-[48px] md:text-[80px] font-light leading-tight tracking-tight text-foreground',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export function H2({ children, className, ...props }: TypographyProps) {
  return (
    <h2
      className={cn(
        'text-[32px] md:text-[48px] font-light leading-tight tracking-normal text-foreground',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export function H3({ children, className, ...props }: TypographyProps) {
  return (
    <h3
      className={cn(
        'text-[24px] md:text-[32px] font-semibold leading-tight tracking-normal text-foreground',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

export function BodyLarge({ children, className, ...props }: TypographyProps) {
  return (
    <p
      className={cn(
        'text-[18px] md:text-[20px] leading-relaxed text-muted',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export function Body({ children, className, ...props }: TypographyProps) {
  return (
    <p
      className={cn(
        'text-[16px] md:text-[18px] leading-normal text-muted',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export function Small({ children, className, ...props }: TypographyProps) {
  return (
    <small
      className={cn(
        'text-[14px] leading-normal text-editorial-gray',
        className
      )}
      {...props}
    >
      {children}
    </small>
  )
}