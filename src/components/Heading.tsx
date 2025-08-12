import styles from './Heading.module.css'
import type { ReactNode } from 'react'

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