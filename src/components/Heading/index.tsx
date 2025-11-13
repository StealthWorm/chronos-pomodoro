import type { ReactNode } from 'react'
import styles from './styles.module.css'

interface HeadingProps {
  children: ReactNode
  className?: string
}

export function Heading({ children, className }: HeadingProps) {
  return (
    <header className={`${styles.heading} ${className}`}>
      {children}
    </header>
  )
}