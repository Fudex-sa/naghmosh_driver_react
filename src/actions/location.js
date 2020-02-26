import { SET_LOCATION_PROVIDER_STATUS } from "./types";

export const setLocationProviderStatus = status => {
  return { type: SET_LOCATION_PROVIDER_STATUS, payload: status };
};
