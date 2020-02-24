import * as types from "../actions/types";

const initialState = {
  userData: null,
  error: null
};

const AuthReducer = (state = initialState, action) => {
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

    default:
      return state;
  }
};
export default AuthReducer;
