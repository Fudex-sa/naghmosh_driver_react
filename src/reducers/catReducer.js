import * as types from '../actions/types';

const initialState = {
  data: [],
};

const CatReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_CATEGORIES:
      console.log(action.payload);
      return { ...state, data: action.payload };

    default:
      return state;
  }
};
export default CatReducer;
