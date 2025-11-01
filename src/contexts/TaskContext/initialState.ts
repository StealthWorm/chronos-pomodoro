import type { TaskStateModel } from "../../models/TaskStateModel";

export const initialState: TaskStateModel = {
  tasks: [],
  millisecondsRemaining: 0,
  formattedMillisecondsRemaining: '00:00',
  activeTask: null,
  currentCycle: 0,
  config: {
    // focusDuration: 25 * 60 * 1000, // 25 minutes
    // shortBreakDuration: 5 * 60 * 1000, // 5 minutes
    // longBreakDuration: 15 * 60 * 1000 // 15 minutes
    focusDuration: 1 * 60 * 1000,
    shortBreakDuration: 1 * 60 * 1000,
    longBreakDuration: 1 * 60 * 1000
  }
}