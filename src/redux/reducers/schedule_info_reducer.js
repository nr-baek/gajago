import { SET_SCHEDULE_INFO } from '../actions/types';

const initialScheduleInfoState = {
  schedulesByRegion: {
    beforeToday: null,
    afterToday: null,
  },
  overallRegionalSchedule: {
    beforeToday: null,
    afterToday: null,
  },
  sortedOverallSchedule: [],
};

const schedule_info_reducer = (state = initialScheduleInfoState, action) => {
  switch (action.type) {
    case SET_SCHEDULE_INFO:
      return action.payload;
    default:
      return state;
  }
};

export default schedule_info_reducer;
