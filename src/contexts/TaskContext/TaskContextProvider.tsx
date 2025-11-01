import { useEffect, useReducer, useRef, type ReactNode } from "react";
import { initialState } from "./initialState";
import { TaskContext } from ".";
import { taskReducer } from "../../reducers/tasks/reducer";
import {
  createNewTaskAction,
  endTaskAction,
  interruptTaskAction,
  resetAction,
  updateTimerAction
} from "../../reducers/tasks/actions";
import type { TaskModel } from "../../models/TaskModel";
import { TimerWorkerManager } from "../../workers/timerWorkerManager";
import { loadBeep } from "../../utils/loadBeep";

interface TasksContextProviderProps {
  children: ReactNode
}

export function TaskContextProvider({ children }: TasksContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null); // hook para carregar o audio e evitar que seja carregado a cada renderização

  const worker = TimerWorkerManager.getInstance();

  // Ao receber uma mensagem do worker, atualiza o estado com o tempo restante
  worker.onmessage(e => {
    const countDownMilliseconds = e.data;

    if (countDownMilliseconds <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      }

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
    if (!state.activeTask) {
      worker.terminate();
    }

    worker.postMessage(state);
  }, [worker, state]);

  useEffect(() => {
    if (state.activeTask && !playBeepRef.current) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

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