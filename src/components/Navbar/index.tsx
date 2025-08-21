import styles from './styles.module.css'

interface NavbarProps {
  children: React.ReactNode
}

export function Navbar({ children }: NavbarProps) {
  return (
    <nav className={styles.navigation}>
      {children}
    </nav>
  )
}