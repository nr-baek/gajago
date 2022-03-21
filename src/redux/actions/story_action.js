import { SET_STORY_SEARCH_ID, CLEAR_STORY_SEARCH_ID } from './types.js';

export const setStorySearchId = (searchId) => {
  return {
    type: SET_STORY_SEARCH_ID,
    payload: searchId,
  };
};

export const clearStorySearchId = () => {
  return {
    type: CLEAR_STORY_SEARCH_ID,
  };
};
