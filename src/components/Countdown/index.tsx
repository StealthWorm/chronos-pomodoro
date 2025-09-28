

import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import styles from "./styles.module.css";

export function Countdown() {
  const { state: { formattedSecondsRemaining } } = useTaskContext();

  return (
    <div className={styles.timerContainer}>
      {formattedSecondsRemaining}
    </div>
  )
}