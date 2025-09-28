import type { TaskStateModel } from "../../models/TaskStateModel";

export const initialState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsRemaining: '00:00',
  activeTask: null,
  currentCycle: 0,
  config: {
    focusDuration: 1500, // 25 minutes
    shortBreakDuration: 300, // 5 minutes
    longBreakDuration: 900 // 15 minutes
  }
}