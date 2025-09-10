import type { ReactNode } from 'react'
import styles from './styles.module.css'

interface HeadingProps {
  children: ReactNode
}

export function Heading({ children }: HeadingProps) {
  return (
    <header className={styles.heading}>
      {children}
    </header>
  )
}