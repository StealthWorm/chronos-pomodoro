
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Tips() {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const tipsMessage = () => {
    if (state.activeTask) {
      switch (state.activeTask.type) {
        case "focusDuration":
          return <span>🧠 Foque por <strong>{state.activeTask.duration / 1000 / 60}</strong> minutos</span>;
        case "shortBreakDuration":
          return <span>⌛ Descanse por <strong>{state.activeTask.duration / 1000 / 60}</strong> minutos</span>;
        case "longBreakDuration":
          return <span>💤 Descanse por <strong>{state.activeTask.duration / 1000 / 60}</strong>  minutos</span>;
      }
    } else {
      switch (nextCycleType) {
        case "focusDuration":
          return <span>⏭️ Próximo: Foco de <strong>{state.config.focusDuration / 1000 / 60}</strong> minutos</span>;
        case "shortBreakDuration":
          return <span>⏭️ Próximo: Intervalo curto de <strong>{state.config.shortBreakDuration / 1000 / 60}</strong> minutos</span>;
        case "longBreakDuration":
          return <span>⏭️ Próximo: Intervalo longo de <strong>{state.config.longBreakDuration / 1000 / 60}</strong> minutos</span>;
      }
    }
  }

  return (
    <div className={styles.tipsContainer} data-testid="tips-container">
      {tipsMessage()}
    </div>
  )
}