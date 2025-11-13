import { RouterLink } from "../RouterLink";
import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>
        <RouterLink href="/about" className={styles.link}>
          Entenda a técnica Pomodoro 🍅
        </RouterLink>
      </span>
      <p>
        Chronos Pomodoro &copy; {new Date().getFullYear()} - 💚
      </p>
    </footer>
  )
}