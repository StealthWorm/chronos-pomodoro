import type { TaskModel } from "../../models/TaskModel";

export enum TaskActionTypes {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  END_TASK = 'END_TASK',
  RESET = 'RESET',
}

export type TaskActionModel =
  | { type: TaskActionTypes.START_TASK, payload: { task: TaskModel } }
  | { type: TaskActionTypes.INTERRUPT_TASK, payload: { task: TaskModel } }
  | { type: TaskActionTypes.END_TASK, payload: { task: TaskModel } }
  | { type: TaskActionTypes.RESET };

export function createNewTaskAction(task: TaskModel) {
  return {
    type: TaskActionTypes.START_TASK,
    payload: {
      task,
    },
  }
}

export function interruptTaskAction() {
  return {
    type: TaskActionTypes.INTERRUPT_TASK,
    payload: null,
  }
}