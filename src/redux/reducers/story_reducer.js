import { SET_STORY_SEARCH_ID, CLEAR_STORY_SEARCH_ID } from '../actions/types';

const initialUserState = {
  searchId: '',
};

const story_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_STORY_SEARCH_ID:
      return {
        searchId: action.payload,
      };

    case CLEAR_STORY_SEARCH_ID:
      return {
        ...initialUserState,
      };

    default:
      return state;
  }
};

export default story_reducer;
