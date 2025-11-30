import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, TrashIcon } from 'lucide-react'
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { Button } from '../../components/Button';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { formatTime } from '../../utils/formatTime';
import { getTaskStatus } from '../../utils/getTaskStatus';
import styles from './styles.module.css';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { useState } from 'react';

export function History() {
  const { state } = useTaskContext();
  const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(() => {
    return {
      tasks: sortTasks({ tasks: state.tasks }),
      field: 'startDate',
      direction: 'desc'
    };
  });

  const taskTypeTranslation = {
    focusDuration: 'Foco',
    shortBreakDuration: 'Intervalo Curto',
    longBreakDuration: 'Intervalo Longo',
  }

  const handleSortTasks = ({ field }: Pick<SortTasksOptions, 'field'>) => {
    const newDirection = sortTasksOptions.direction === 'asc' ? 'desc' : 'asc';

    setSortTasksOptions({
      tasks: sortTasks({
        tasks: sortTasksOptions.tasks,
        field,
        direction: newDirection
      }),
      direction: newDirection,
      field,
    });
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
                <th onClick={() => handleSortTasks({ field: 'title' })} className={styles.sortableHeader}>
                  <span>Tarefa
                    {sortTasksOptions.direction === 'asc' && sortTasksOptions.field === 'title'
                      ? <ArrowUpIcon className={styles.sortableIcon} />
                      : sortTasksOptions.direction === 'desc' && sortTasksOptions.field === 'title'
                        ? <ArrowDownIcon className={styles.sortableIcon} />
                        : <ArrowUpDownIcon className={styles.sortableIcon} />}
                  </span>
                </th>
                <th onClick={() => handleSortTasks({ field: 'duration' })} className={styles.sortableHeader}>
                  <span>Duração
                    {sortTasksOptions.direction === 'asc' && sortTasksOptions.field === 'duration'
                      ? <ArrowUpIcon className={styles.sortableIcon} />
                      : sortTasksOptions.direction === 'desc' && sortTasksOptions.field === 'duration'
                        ? <ArrowDownIcon className={styles.sortableIcon} />
                        : <ArrowUpDownIcon className={styles.sortableIcon} />}
                  </span>
                </th>
                <th onClick={() => handleSortTasks({ field: 'startDate' })} className={styles.sortableHeader}>
                  <span>Data
                    {sortTasksOptions.direction === 'asc' && sortTasksOptions.field === 'startDate'
                      ? <ArrowUpIcon className={styles.sortableIcon} />
                      : sortTasksOptions.direction === 'desc' && sortTasksOptions.field === 'startDate'
                        ? <ArrowDownIcon className={styles.sortableIcon} />
                        : <ArrowUpDownIcon className={styles.sortableIcon} />}
                  </span>
                </th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>

            <tbody>
              {sortTasksOptions.tasks.map((task) => {
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

