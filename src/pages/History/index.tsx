import { TrashIcon } from 'lucide-react'
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { Button } from '../../components/Button';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import styles from './styles.module.css';
import { formatTime } from '../../utils/formatTime';

export function History() {
  const { state } = useTaskContext();

  const taskStatusColor = {
    completed: 'success',
    interrupted: 'error',
    pending: 'warning',
  }

  const taskTypeTranslation = {
    focusDuration: 'Foco',
    shortBreakDuration: 'Intervalo Curto',
    longBreakDuration: 'Intervalo Longo',
  }

  const orderedTasks = state.tasks.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  return (
    <div className={styles.historyContainer}>
      <Container>
        <Heading className={styles.heading}>
          <span>History</span>
          <span className={styles.buttonContainer}>
            <Button
              icon={<TrashIcon />}
              color='error'
              aria-label='Apagar todo o histórico'
              title='Apagar histórico'
            />
          </span>
        </Heading>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Data</th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>

            <tbody>
              {orderedTasks.map((task) => {
                return (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{formatTime(task.duration)}</td>
                    <td>{formatDate(task.startDate)}</td>
                    {task.interruptDate &&
                      <td >
                        <span className={styles[taskStatusColor.interrupted]}>Interrompido</span>
                      </td>}
                    {task.endDate && <td>
                      <span className={styles[taskStatusColor.completed]}>Completado</span>
                    </td>}
                    {!task.interruptDate && !task.endDate && <td>
                      <span className={styles[taskStatusColor.pending]}>Pendente</span>
                    </td>}
                    <td>
                      <span>{taskTypeTranslation[task.type]}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  )
}

