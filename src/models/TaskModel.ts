import type { TaskStateModel } from "./TaskStateModel";

export type TaskModel = {
  id: number
  title: string
  description: string
  duration: number;
  startDate: number;
  endDate: number | null;
  interruptDate: number | null;
  type: keyof TaskStateModel['config'];
}