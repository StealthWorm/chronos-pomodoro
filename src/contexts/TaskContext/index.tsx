import { createContext } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { initialState } from "./initialState";

export type TaskContextProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
  actionTimerStart: () => void
};

export const initialContext = {
  state: initialState,
  setState: () => { },
  actionTimerStart: () => { }
};

export const TaskContext = createContext<TaskContextProps>(initialContext);
