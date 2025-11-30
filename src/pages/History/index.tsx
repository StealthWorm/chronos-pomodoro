import { useEffect, useState } from 'react';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, TrashIcon } from 'lucide-react'
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { Button } from '../../components/Button';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { formatTime } from '../../utils/formatTime';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import styles from './styles.module.css';
import { toastifyAdapter } from '../../adapters/toastify.adapter';

export function History() {
  const { state, reset } = useTaskContext();
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
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

  const handleDeleteAllTasks = () => {
    toastifyAdapter.dismiss();

    if (state.activeTask) {
      toastifyAdapter.error("Não é possível apagar o histórico com uma tarefa em andamento");
      return;
    }

    toastifyAdapter.confirm(
      'Tem certeza que deseja apagar todo o histórico?',
      (confirmed) => setConfirmClearHistory(confirmed)
    );
  }

  useEffect(() => {
    setSortTasksOptions(prev => ({
      ...prev,
      tasks: sortTasks({
        tasks: state.tasks,
        field: prev.field,
        direction: prev.direction
      }),
    }));
  }, [state.tasks]);

  useEffect(() => {
    if (!confirmClearHistory) return;

    reset();
    setConfirmClearHistory(false);
  }, [confirmClearHistory, reset]);

  const hasTasks = sortTasksOptions.tasks.length > 0;

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
              onClick={handleDeleteAllTasks}
              disabled={!hasTasks}
            />
          </span>
        </Heading>
      </Container>
      {hasTasks ? (
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
      ) : (
        <Container>
          <p className={styles.noTasks}>Nenhuma tarefa encontrada</p>
        </Container>
      )}
    </div>
  )
}

