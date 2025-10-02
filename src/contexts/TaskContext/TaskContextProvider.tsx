
import { useEffect, useState, type ReactNode } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { initialState } from "./initialState";
import { TaskContext } from ".";

interface TasksContextProviderProps {
  children: ReactNode
}

export function TaskContextProvider({ children }: TasksContextProviderProps) {
  const [state, setState] = useState<TaskStateModel>(initialState);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  const actionTimerStart = () => {
    if (!state.activeTask) return;

    setState((prevState) => ({
      ...prevState,
      formattedSecondsRemaining: formatTime(prevState.activeTask!.duration),
    }));
  }

  useEffect(() => {
    if (state.activeTask) {
      const interval = setInterval(() => {
        if (state.secondsRemaining <= 0) {
          clearInterval(interval);
          return
        }

        setState((prevState) => ({
          ...prevState,
          secondsRemaining: prevState.secondsRemaining - 10,
          formattedSecondsRemaining: formatTime(prevState.secondsRemaining),
        }))
      }, 10);

      return () => clearInterval(interval);
    }
  }, [state.secondsRemaining, state.activeTask]);

  useEffect(() => {
    console.log(state.activeTask);
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, setState, actionTimerStart }}>
      {children}
    </TaskContext.Provider>
  );
}