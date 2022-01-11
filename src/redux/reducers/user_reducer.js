import { CLEAR_USER, SET_USER } from '../actions/types';

const initialUserState = {
  currentUser: null,
  isLoading: true,
};

const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: { ...action.payload },
        isLoading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default user_reducer;
