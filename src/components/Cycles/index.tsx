import styles from "./styles.module.css";

export function Cycles() {
  return (
    <div className={styles.cycleContainer}>
      <span>Ciclos:</span>

      <ul className={styles.cycleList}>
        <li className={`${styles.cycleListDot} ${styles.workTime}`}></li>
        <li className={`${styles.cycleListDot} ${styles.shortBreakTime}`}></li>
        <li className={`${styles.cycleListDot} ${styles.workTime}`}></li>
        <li className={`${styles.cycleListDot} ${styles.stopTime}`}></li>
        <li className={`${styles.cycleListDot} ${styles.shortBreakTime}`}></li>
        <li className={`${styles.cycleListDot} ${styles.workTime}`}></li>
        <li className={`${styles.cycleListDot} ${styles.shortBreakTime}`}></li>
        <li className={`${styles.cycleListDot} ${styles.longBreakTime}`}></li>
      </ul>
    </div>
  )
}