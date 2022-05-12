import { CLEAR_USER, SET_PHOTO_URL, SET_USER, SET_TROPHY_INFO, SET_PUBLIC_REVIEW_COUNT } from '../actions/types';

const initialUserState = {
  currentUser: null,
  trophyInfo: {
    isOwner: false,
    regionCountOfTrip: 0,
  },
  publicReviewCount: 0,
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
        ...initialUserState,
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

    case SET_TROPHY_INFO:
      return {
        ...state,
        trophyInfo: action.payload ? action.payload : initialUserState.trophyInfo,
        isLoading: false,
      };

    case SET_PUBLIC_REVIEW_COUNT:
      return {
        ...state,
        publicReviewCount: action.payload,
      };

    default:
      return state;
  }
};

export default user_reducer;
