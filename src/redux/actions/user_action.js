import { CLEAR_USER, SET_USER, SET_PHOTO_URL, SET_TROPHY_INFO, SET_PUBLIC_REVIEW_COUNT } from './types.js';

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};

export const setPhotoURL = (photoURL) => {
  return {
    type: SET_PHOTO_URL,
    payload: photoURL,
  };
};

export const setTrophyInfo = (trophyInfo) => {
  return {
    type: SET_TROPHY_INFO,
    payload: trophyInfo,
  };
};

export const setPublicReviewCount = (publicReviewCount) => {
  return {
    type: SET_PUBLIC_REVIEW_COUNT,
    payload: publicReviewCount,
  };
};
