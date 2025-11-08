import { TimerIcon } from "lucide-react";
import { RouterLink } from "../RouterLink";
import styles from "./styles.module.css";

export function Logo() {
  return (
    <RouterLink href="/" className={styles.logoContainer}>
      <TimerIcon size={64} />
      <span>Chronos Pomodoro</span>
    </RouterLink>
  )
}