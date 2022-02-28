import { SET_USERS_INFO } from '../actions/types';

const initialUsersInfoState = null;

const usersInfo_reducer = (state = initialUsersInfoState, action) => {
  switch (action.type) {
    case SET_USERS_INFO:
      console.log('SET_USERS_INFO');
      return action.payload;

    default:
      return state;
  }
};

export default usersInfo_reducer;
