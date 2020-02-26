import * as types from "../actions/types";

const initialState = {
  userData: null,
  error: null,
  coupon: null,
  count: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return { ...state, userData: action.payload };

    case types.LOGIN_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case types.LOGIN_RESET_ERROR:
      return {
        ...state,
        error: null
      };
    case types.LOGOUT:
      return { ...state, userData: null };

    case types.SET_COUPON:
      return { ...state, coupon: action.payload }

    case types.SET_CART_COUNT:
      return { ...state, count: action.payload }

    default:
      return state;
  }
};
