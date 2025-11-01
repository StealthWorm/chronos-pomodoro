import type { TaskStateModel } from "../../models/TaskStateModel";
import { formatTime } from "../../utils/formatTime";
import { getNextCycle } from "../../utils/getNextCycle";
import { TaskActionTypes, type TaskActionModel } from "./actions";

export function taskReducer(state: TaskStateModel, action: TaskActionModel) {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      return {
        ...state,
        activeTask: action.payload.task,
        currentCycle: getNextCycle(state.currentCycle),
        millisecondsRemaining: action.payload.task.duration,
        formattedMillisecondsRemaining: formatTime(action.payload.task.duration),
        tasks: [...state.tasks, action.payload.task],
      }
    }

    case TaskActionTypes.END_TASK: {
      return {
        ...state,
        activeTask: null,
        millisecondsRemaining: 0,
        formattedMillisecondsRemaining: '00:00',
        tasks: state.tasks.map(task => task.id === state.activeTask?.id ? { ...task, endDate: Date.now() } : task),
      }
    }

    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        millisecondsRemaining: 0,
        formattedMillisecondsRemaining: '00:00',
        tasks: state.tasks.map(task => task.id === state.activeTask?.id ? { ...task, interruptDate: Date.now() } : task),
      }
    }

    case TaskActionTypes.UPDATE_TIME_REMAINING: {
      return {
        ...state,
        millisecondsRemaining: action.payload.millisecondsRemaining,
        formattedMillisecondsRemaining: formatTime(action.payload.millisecondsRemaining),
      }
    }

    case TaskActionTypes.RESET: {
      return {
        ...state,
        activeTask: null,
        millisecondsRemaining: 0,
        formattedMillisecondsRemaining: '00:00',
        tasks: [],
      }
    }

    default:
      return state;
  }
}