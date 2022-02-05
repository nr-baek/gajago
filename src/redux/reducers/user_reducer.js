import { CLEAR_USER, SET_PHOTO_URL, SET_PLAN_DATA, SET_USER, SET_TROPHY_INFO } from '../actions/types';

const initialUserState = {
  currentUser: null,
  planData: [],
  trophyInfo: {
    isOwner: false,
    tripCount: 0,
  },
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
    case SET_TROPHY_INFO:
      return {
        ...state,
        trophyInfo: action.payload ? action.payload : initialUserState.trophyInfo,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default user_reducer;
