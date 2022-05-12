import { combineReducers } from 'redux';
import user from './user_reducer';
import usersInfo from './usersInfo_reducer';
import story from './story_reducer';
import schedule_info from './schedule_info_reducer';

const rootReducer = combineReducers({
  user,
  usersInfo,
  story,
  schedule_info,
});

export default rootReducer;
