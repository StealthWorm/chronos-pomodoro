import type { ReactNode } from 'react'
import styles from './styles.module.css'

interface HeadingProps {
  children: ReactNode
}

export function Heading({ children }: HeadingProps) {
  return (
    <h1 className={styles.heading}>
      {children}
    </h1>
  )
}