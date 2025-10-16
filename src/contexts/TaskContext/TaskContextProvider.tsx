
import { useEffect, useState, type ReactNode } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { initialState } from "./initialState";
import { TaskContext } from ".";
import { formatTime } from "../../utils/formatTime";

interface TasksContextProviderProps {
  children: ReactNode
}

export function TaskContextProvider({ children }: TasksContextProviderProps) {
  const [state, setState] = useState<TaskStateModel>(initialState);
  const actionTimerStart = () => {
    if (!state.activeTask) return;
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
    console.log(state.tasks);
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, setState, actionTimerStart }}>
      {children}
    </TaskContext.Provider>
  );
}