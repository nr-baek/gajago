import { combineReducers } from 'redux';
import user from './user_reducer';
import page from './page_reducer';
import usersInfo from './usersInfo_reducer';

const rootReducer = combineReducers({
  user,
  page,
  usersInfo,
});

export default rootReducer;
