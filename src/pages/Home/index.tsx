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

export function Home() {
  const { actionTimerStart, state, setState } = useTaskContext();
  const taskInputName = useRef<HTMLInputElement>(null);

  const handleStartTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!taskInputName.current || !taskInputName.current.value.trim()) {
      alert("Task is required");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      title: taskInputName.current.value,
      duration: 25 * 60 * 1000, // 25 minutes
      startDate: Date.now(),
      endDate: null,
      interruptDate: null,
      type: "focusDuration"
    }

    setState((prevState) => ({
      ...prevState,
      activeTask: newTask,
      currentCycle: prevState.currentCycle + 1,
      secondsRemaining: newTask.duration,
      tasks: [...prevState.tasks, newTask]
    }));
    actionTimerStart();
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
          />

          <p>
            Próximo intervalo é de 25 minutos
          </p>

          <Cycles />

          <Button
            type="submit"
            icon={state.currentCycle > 0
              ? <StopCircleIcon size={32} />
              : <PlayCircleIcon size={32} />
            }
            color={state.currentCycle > 0 ? "error" : "success"}
          />
        </form>
      </Container>
    </>
  )
}