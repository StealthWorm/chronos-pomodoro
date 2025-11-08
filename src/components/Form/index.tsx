import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { useRef } from "react";
import { Button } from "../../components/Button";
import { Cycles } from "../../components/Cycles";
import { Input } from "../../components/Input";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import type { TaskModel } from "../../models/TaskModel";
import { Tips } from "../../components/Tips";
import { toastifyAdapter } from "../../adapters/toastify.adapter";
import styles from "./styles.module.css";

export function Form() {
  const { state, createNewTask, interruptTask } = useTaskContext();
  const taskInputName = useRef<HTMLInputElement>(null);
  const lastTaskTitle = state.tasks[state.tasks.length - 1]?.title || '';

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const handleStartTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toastifyAdapter.dismiss();

    if (!taskInputName.current || !taskInputName.current.value.trim()) {
      toastifyAdapter.warning("A task é obrigatória");
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

    toastifyAdapter.success("Tarefa iniciada !!");
  }

  const handleInterruptTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (state.activeTask) {
      e.preventDefault();
      toastifyAdapter.dismiss();

      interruptTask();
      toastifyAdapter.error("Tarefa interrompida !!");
    }
  }

  return (
    <form className={styles.form} action="" onSubmit={(e) => handleStartTask(e)}>
      <Input
        label="Task"
        placeholder="Enter your task"
        id="task"
        type="text"
        ref={taskInputName}
        disabled={!!state.activeTask}
        defaultValue={lastTaskTitle}
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
  )
}