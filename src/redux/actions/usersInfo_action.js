import { SET_USERS_INFO } from './types';

export const setUsersInfo = (usersInfo) => {
  return {
    type: SET_USERS_INFO,
    payload: usersInfo,
  };
};
