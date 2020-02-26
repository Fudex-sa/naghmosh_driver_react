import { SET_LOCATION_PROVIDER_STATUS } from "../actions/types";

const initialState = {
  locationProviderIsOn: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION_PROVIDER_STATUS:
      return { ...state, locationProviderIsOn: action.payload };
    default:
      return state;
  }
};
