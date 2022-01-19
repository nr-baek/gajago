import { SET_PAGE } from '../actions/types';

const initialPageState = {
  currentPage: 'schedule',
};

const page_reducer = (state = initialPageState, action) => {
  switch (action.type) {
    case SET_PAGE:
      console.log('SET_PAGE');
      return {
        currentPage: action.payload,
      };

    default:
      return state;
  }
};

export default page_reducer;
