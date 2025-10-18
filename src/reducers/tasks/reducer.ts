import type { TaskStateModel } from "../../models/TaskStateModel";
import { TaskActionTypes, type TaskActionModel } from "./actions";

export function TaskReducer(state: TaskStateModel, action: TaskActionModel) {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task],
        activeTask: action.payload.task
      }
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === state.activeTask?.id ? { ...task, interruptDate: Date.now() } : task),
        activeTask: null
      }
    }

    default:
      return state;
  }
}