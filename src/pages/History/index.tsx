import { ArrowDown, ArrowUp, TrashIcon } from 'lucide-react'
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { Button } from '../../components/Button';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { formatTime } from '../../utils/formatTime';
import { getTaskStatus } from '../../utils/getTaskStatus';
import styles from './styles.module.css';
import { sortTasks } from '../../utils/sortTasks';

export function History() {
  const { state } = useTaskContext();
  const sortedTasks = sortTasks({ tasks: state.tasks, field: 'startDate', direction: 'desc' });

  const taskTypeTranslation = {
    focusDuration: 'Foco',
    shortBreakDuration: 'Intervalo Curto',
    longBreakDuration: 'Intervalo Longo',
  }

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
                <th className={styles.sortableHeader}>
                  Data
                </th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>

            <tbody>
              {sortedTasks.map((task) => {
                const taskStatus = getTaskStatus(task, state.activeTask);
                return (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{formatTime(task.duration)}</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>
                      <span className={styles[taskStatus.status]}>
                        {taskStatus.label}
                      </span>
                    </td>
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

