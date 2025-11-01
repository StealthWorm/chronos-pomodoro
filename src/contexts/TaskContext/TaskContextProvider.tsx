
import { useEffect, useReducer, type ReactNode } from "react";
import { initialState } from "./initialState";
import { TaskContext } from ".";
import { taskReducer } from "../../reducers/tasks/reducer";
import { createNewTaskAction, endTaskAction, interruptTaskAction, resetAction, updateTimerAction } from "../../reducers/tasks/actions";
import type { TaskModel } from "../../models/TaskModel";
import { TimerWorkerManager } from "../../workers/timerWorkerManager";

interface TasksContextProviderProps {
  children: ReactNode
}

export function TaskContextProvider({ children }: TasksContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const worker = TimerWorkerManager.getInstance();

  // Ao receber uma mensagem do worker, atualiza o estado com o tempo restante
  worker.onmessage(e => {
    const countDownMilliseconds = e.data;

    if (countDownMilliseconds <= 0) {
      console.log('Worker COMPLETED');
      dispatch(endTaskAction());
      worker.terminate();
      return;
    }

    dispatch(updateTimerAction(countDownMilliseconds));
  });

  const createNewTask = (task: TaskModel) => {
    dispatch(createNewTaskAction(task));
  }

  const interruptTask = () => {
    dispatch(interruptTaskAction());
  }

  useEffect(() => {
    if (state.currentCycle >= 8 && !state.activeTask) {
      dispatch(resetAction());
    }
  }, [state.currentCycle, state.activeTask]);

  useEffect(() => {
    console.log('state', state);

    if (!state.activeTask) {
      console.log('Worker terminado por falta de activeTask');

      worker.terminate();
    }

    worker.postMessage(state);
  }, [worker, state]);

  return (
    <TaskContext.Provider value={{
      state,
      createNewTask,
      interruptTask,
      endTask: () => { },
      reset: () => { }
    }}
    >
      {children}
    </ TaskContext.Provider>
  );
}