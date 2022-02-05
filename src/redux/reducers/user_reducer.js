import { CLEAR_USER, SET_PHOTO_URL, SET_PLAN_DATA, SET_USER, SET_TROPHY } from '../actions/types';

const initialUserState = {
  currentUser: null,
  planData: [],
  trophy: false,
  isLoading: true,
};

const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: { ...action.payload },
      };
    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        planData: [],
        isLoading: false,
      };
    case SET_PHOTO_URL:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          photoURL: action.payload,
        },
        isLoading: false,
      };
    case SET_PLAN_DATA:
      return {
        ...state,
        planData: action.payload,
      };
    case SET_TROPHY:
      return {
        ...state,
        trophy: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default user_reducer;
