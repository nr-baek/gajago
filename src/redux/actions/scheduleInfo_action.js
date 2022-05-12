import { SET_SCHEDULE_INFO } from './types.js';

export const setScheduleInfo = (scheduleInfo) => {
  return {
    type: SET_SCHEDULE_INFO,
    payload: scheduleInfo,
  };
};
