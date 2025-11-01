import { createContext } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
import type { TaskModel } from "../../models/TaskModel";

export type TaskContextType = {
  state: TaskStateModel;
  createNewTask: (task: TaskModel) => void;
  interruptTask: () => void;
  endTask: () => void;
  reset: () => void;
};

export const TaskContext = createContext<TaskContextType>({} as TaskContextType);
