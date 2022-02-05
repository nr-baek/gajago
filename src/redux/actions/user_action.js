import { CLEAR_USER, SET_USER, SET_PHOTO_URL, SET_PLAN_DATA, SET_TROPHY } from './types.js';

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

export const setPlanData = (planArray) => {
  return {
    type: SET_PLAN_DATA,
    payload: planArray,
  };
};

export const setTrophy = (haveTrophy) => {
  return {
    type: SET_TROPHY,
    payload: haveTrophy,
  };
};
