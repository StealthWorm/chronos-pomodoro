import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { TasksContext } from "../../contexts";

export function Countdown() {
  const { secondsRemaining } = useContext(TasksContext);
  const [time, setTime] = useState<number>(secondsRemaining); // 10 minutes
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        if (time <= 0) {
          setIsRunning(false);
        }
        setTime(time - 10)
      }, 10);
      return () => clearInterval(interval);
    }
  }, [time, isRunning]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  const handleTimerStart = () => {
    setIsRunning(true);
  }

  return (
    <div className={styles.timerContainer} onClick={handleTimerStart}>
      {formatTime(time)}
    </div>
  )
}