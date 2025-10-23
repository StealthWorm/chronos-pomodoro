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
        secondsRemaining: action.payload.task.duration,
        formattedSecondsRemaining: formatTime(action.payload.task.duration),
        tasks: [...state.tasks, action.payload.task],
      }
    }

    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => task.id === state.activeTask?.id ? { ...task, interruptDate: Date.now() } : task),
      }
    }

    case TaskActionTypes.UPDATE_TIME_REMAINING: {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 10,
        formattedSecondsRemaining: formatTime(state.secondsRemaining),
      }
    }

    case TaskActionTypes.RESET: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: [],
      }
    }

    default:
      return state;
  }
}