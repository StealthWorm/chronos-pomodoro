import { TimerIcon } from "lucide-react";
import styles from "./styles.module.css";

export function Logo() {
  return (
    <a href="/" className={styles.logoContainer}>
      <TimerIcon size={64} />
      <span>Chronos Pomodoro</span>
    </a>
  )
}