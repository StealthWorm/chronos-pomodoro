import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Countdown } from "../../components/Countdown";
import { Cycles } from "../../components/Cycles";
import { Input } from "../../components/Input";
import styles from "./styles.module.css";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { formatTime } from "../../utils/formatTime";

export function Home() {
  const { state, setState } = useTaskContext();
  const taskInputName = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const handleStartTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!taskInputName.current || !taskInputName.current.value.trim()) {
      alert("Task is required");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      title: taskInputName.current.value,
      duration: state.config[nextCycleType],
      startDate: Date.now(),
      endDate: null,
      interruptDate: null,
      type: nextCycleType
    }

    setState((prevState) => ({
      ...prevState,
      activeTask: newTask,
      currentCycle: nextCycle,
      secondsRemaining: newTask.duration,
      formattedSecondsRemaining: formatTime(newTask.duration),
      tasks: [...prevState.tasks, newTask]
    }));
  }

  return (
    <>
      <Container>
        <Countdown />
      </Container>
      <Container>
        <form className={styles.form} action="" onSubmit={(e) => handleStartTask(e)}>
          <Input
            label="Task"
            placeholder="Enter your task"
            id="task"
            type="text"
            ref={taskInputName}
            disabled={!!state.activeTask}
          />

          <p>
            Próximo intervalo é de 25 minutos
          </p>


          {state.currentCycle > 0 && <Cycles />}

          <Button
            type={!state.activeTask ? "submit" : "button"}
            arria-label={!state.activeTask ? "Iniciar Tarefa" : "Parar Tarefa"}
            title={!state.activeTask ? "Iniciar Tarefa" : "Parar Tarefa"}
            icon={!state.activeTask
              ? <PlayCircleIcon size={32} />
              : <StopCircleIcon size={32} />
            }
            color={!state.activeTask ? "success" : "error"}
          />
        </form>
      </Container>
    </>
  )
}