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
  | { type: TaskActionTypes.END_TASK }
  | { type: TaskActionTypes.INTERRUPT_TASK }
  | { type: TaskActionTypes.UPDATE_TIME_REMAINING, payload: { millisecondsRemaining: number } }
  | { type: TaskActionTypes.RESET }

export function createNewTaskAction(task: TaskModel): TaskActionModel {
  return {
    type: TaskActionTypes.START_TASK,
    payload: {
      task,
    },
  }
}

export function endTaskAction(): TaskActionModel {
  return {
    type: TaskActionTypes.END_TASK,
  }
}
export function interruptTaskAction(): TaskActionModel {
  return {
    type: TaskActionTypes.INTERRUPT_TASK,
  }
}

export function updateTimerAction(millisecondsRemaining: number): TaskActionModel {
  return {
    type: TaskActionTypes.UPDATE_TIME_REMAINING,
    payload: {
      millisecondsRemaining
    },
  }
}

export function resetAction(): TaskActionModel {
  return {
    type: TaskActionTypes.RESET,
  }
}