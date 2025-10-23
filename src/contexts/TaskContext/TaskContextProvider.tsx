
import { useEffect, useReducer, type ReactNode } from "react";
import { initialState } from "./initialState";
import { TaskContext } from ".";
import { taskReducer } from "../../reducers/tasks/reducer";
import { createNewTaskAction, interruptTaskAction, resetAction, updateTimerAction } from "../../reducers/tasks/actions";
import type { TaskModel } from "../../models/TaskModel";

interface TasksContextProviderProps {
  children: ReactNode
}

export function TaskContextProvider({ children }: TasksContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialState, () => initialState);

  const createNewTask = (task: TaskModel) => {
    dispatch(createNewTaskAction(task));
  }

  const interruptTask = (activeTask: TaskModel) => {
    dispatch(interruptTaskAction(activeTask));
  }

  useEffect(() => {
    if (state.activeTask) {
      const interval = setInterval(() => {
        if (state.secondsRemaining <= 0) {
          clearInterval(interval);
          return
        }

        dispatch(updateTimerAction());
      }, 10);

      return () => clearInterval(interval);
    }
  }, [state.secondsRemaining, state.activeTask]);

  useEffect(() => {
    if (state.currentCycle >= 8 && !state.activeTask) {
      dispatch(resetAction());
    }
  }, [state.currentCycle, state.activeTask]);

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