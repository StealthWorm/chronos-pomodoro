import type { TaskModel } from "../../models/TaskModel";

export enum TaskActionTypes {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  UPDATE_TIME_REMAINING = 'UPDATE_TIME_REMAINING',
  END_TASK = 'END_TASK',
  RESET = 'RESET',
}

export type TaskActionModel =
  | { type: TaskActionTypes.START_TASK, payload: { task: TaskModel } }
  | { type: TaskActionTypes.INTERRUPT_TASK, payload: { activeTask: TaskModel } }
  | { type: TaskActionTypes.UPDATE_TIME_REMAINING }
  | { type: TaskActionTypes.END_TASK }
  | { type: TaskActionTypes.RESET }

export function createNewTaskAction(task: TaskModel): TaskActionModel {
  return {
    type: TaskActionTypes.START_TASK,
    payload: {
      task,
    },
  }
}

export function interruptTaskAction(activeTask: TaskModel): TaskActionModel {
  return {
    type: TaskActionTypes.INTERRUPT_TASK,
    payload: {
      activeTask
    },
  }
}

export function updateTimerAction(): TaskActionModel {
  return {
    type: TaskActionTypes.UPDATE_TIME_REMAINING,
  }
}

export function resetAction(): TaskActionModel {
  return {
    type: TaskActionTypes.RESET,
  }
}