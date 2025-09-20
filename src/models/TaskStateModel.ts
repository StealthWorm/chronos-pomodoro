import type { TaskModel } from "./TaskModel"

export type TaskStateModel = {
  tasks: TaskModel[];
  secondsRemaining: number;
  formattedSecondsRemaining: string;
  activweTask: TaskModel | null;
  currentCycle: number;
  config: { focusDuration: number; shortBreakDuration: number; longBreakDuration: number };
}