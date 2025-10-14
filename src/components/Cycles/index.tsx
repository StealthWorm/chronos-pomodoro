import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import styles from "./styles.module.css";

export function Cycles() {
  const { state } = useTaskContext();

  const cycleStep = Array.from({ length: state.tasks.length, }, (_, index) => state.tasks[index]);

  const cycleDescription = {
    focusDuration: "Periodo de Foco",
    shortBreakDuration: "Intervalo Curto",
    longBreakDuration: "Intervalo Longo",
    stopTime: "Interrupção"
  };

  return (
    <div className={styles.cycleContainer}>
      <span>Ciclos:</span>

      <ul className={styles.cycleList}>
        {cycleStep.map((task) => (
          <li
            className={`${styles.cycleListDot} ${styles[task.type]} ${task.id === state.activeTask?.id ? styles.active : ''}`}
            key={task.id}
            title={cycleDescription[task.type]}
            aria-label={`Indicador de Ciclo - ${cycleDescription[task.type]}`}
          ></li>
        ))}
      </ul>
    </div>
  )
}