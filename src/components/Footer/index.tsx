import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>
        <a
          href="https://pt.wikipedia.org/wiki/T%C3%A9cnica_pomodoro"
          target="_blank"
          rel="noopener noreferrer"
        >
          Entenda a técnica Pomodoro 🍅
        </a>
      </span>
      <p>
        Chronos Pomodoro &copy; {new Date().getFullYear()} - 💚
      </p>
    </footer>
  )
}