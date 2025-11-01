

import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import styles from "./styles.module.css";

export function Countdown() {
  const { state: { formattedMillisecondsRemaining, activeTask } } = useTaskContext();

  return (
    <div className={`${styles.timerContainer} ${!activeTask ? styles.standBy : ''}`}>
      {formattedMillisecondsRemaining}
    </div>
  )
}