import { LOGIN_SUCCESS, SET_COUPON, SET_CART_COUNT } from "./types";

export const setUserData = userData => {
  return { type: LOGIN_SUCCESS, payload: userData };
};

export const setCoupon = coupon => {
  return { type: SET_COUPON, payload: coupon }
}

export const setCartCount = count => {
  return { type: SET_CART_COUNT, payload: count }
}
