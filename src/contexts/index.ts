import { createContext } from "react";
import type { TaskStateModel } from "../models/TaskStateModel";

export const TasksContext = createContext({} as TaskStateModel);
