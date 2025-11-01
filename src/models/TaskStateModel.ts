import type { TaskModel } from "./TaskModel"

export type TaskStateModel = {
  tasks: TaskModel[];
  millisecondsRemaining: number;
  formattedMillisecondsRemaining: string;
  activeTask: TaskModel | null;
  currentCycle: number;
  config: { focusDuration: number; shortBreakDuration: number; longBreakDuration: number };
}