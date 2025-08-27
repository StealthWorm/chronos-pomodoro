import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export function Home() {
  const [time, setTime] = useState<number>(10 * 60 * 1000); // 10 minutes

  useEffect(() => {
    const interval = setInterval(() => setTime(time - 10), 10);

    return () => clearInterval(interval);
  }, [time]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  }

  return (
    <main>
      <div className={styles.timerContainer}>
        <div className={styles.timerDisplay}>
          <span>{formatTime(time)}</span>
        </div>
      </div>
    </main>
  )
}