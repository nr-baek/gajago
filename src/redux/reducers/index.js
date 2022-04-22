import { combineReducers } from 'redux';
import user from './user_reducer';
import usersInfo from './usersInfo_reducer';
import story from './story_reducer';

const rootReducer = combineReducers({
  user,
  usersInfo,
  story,
});

export default rootReducer;
