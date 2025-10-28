import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { useRef } from "react";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Countdown } from "../../components/Countdown";
import { Cycles } from "../../components/Cycles";
import { Input } from "../../components/Input";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import type { TaskModel } from "../../models/TaskModel";
import { Tips } from "../../components/Tips";
import { TimerWorkerManager } from "../../workers/timerWorkerManager";
import styles from "./styles.module.css";

export function Home() {
  const { state, createNewTask, interruptTask } = useTaskContext();
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

    createNewTask(newTask);

    const worker = TimerWorkerManager.getInstance();

    worker.onmessage((event) => {
      console.log('recebeu', event.data);
    })

    worker.postMessage("lalala")
  }

  const handleInterruptTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (state.activeTask) {
      e.preventDefault();

      interruptTask(state.activeTask);
    }
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

          <Tips />

          {state.currentCycle > 0 && <Cycles />}

          <Button
            type={!state.activeTask ? "submit" : "button"}
            aria-label={!state.activeTask ? "Iniciar Tarefa" : "Parar Tarefa"}
            title={!state.activeTask ? "Iniciar Tarefa" : "Parar Tarefa"}
            icon={!state.activeTask
              ? <PlayCircleIcon size={32} />
              : <StopCircleIcon size={32} />
            }
            color={!state.activeTask ? "success" : "error"}
            onClick={(e) => handleInterruptTask(e)}
          />
        </form>
      </Container>
    </>
  )
}