import NetInfo from "@react-native-community/netinfo";

import { SET_INTERNET_CONNECTION } from './types';

export async function initInternetConnection(dispatch) {
  console.log("in network")
  NetInfo.addEventListener(state => {
    dispatch({ type: SET_INTERNET_CONNECTION, payload: state.isConnected });
  });
}
