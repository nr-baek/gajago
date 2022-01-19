import { SET_PAGE } from './types';

export const setPage = (currentPage) => {
  return {
    type: SET_PAGE,
    payload: currentPage,
  };
};
