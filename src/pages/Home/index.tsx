import styles from "./styles.module.css";

export function Home() {
  return (
    <main>
      <div className={styles.timerContainer}>
        <div className={styles.timerDisplay}>
          <span>00:00:00</span>
        </div>
      </div>
    </main>
  )
}