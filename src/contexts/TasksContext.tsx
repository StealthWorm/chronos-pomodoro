
import { type ReactNode } from "react";
import { TasksContext } from "./";

interface TasksContextProviderProps {
  children: ReactNode
}

export function TasksContextProvider({ children }: TasksContextProviderProps) {
  return (
    <TasksContext.Provider value={{
      tasks: [],
      secondsRemaining: 10 * 60 * 1000,
      formattedSecondsRemaining: '00:00',
      activweTask: null,
      currentCycle: 0,
      config: {
        focusDuration: 1500, // 25 minutes
        shortBreakDuration: 300, // 5 minutes
        longBreakDuration: 900 // 15 minutes
      }
    }}>
      {children}
    </TasksContext.Provider>
  );
}