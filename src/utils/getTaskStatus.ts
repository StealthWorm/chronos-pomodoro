import type { TaskModel } from "../models/TaskModel";

export const getTaskStatus = (task: TaskModel, activeTask: TaskModel | null) => {
  if (task.endDate) return { label: 'Completado', status: 'success' };
  if (task.interruptDate) return { label: 'Interrompido', status: 'error' };
  if (task.id === activeTask?.id) return { label: 'Em progresso', status: 'warning' };

  return { label: 'Abandonado', status: 'abandoned' };
}