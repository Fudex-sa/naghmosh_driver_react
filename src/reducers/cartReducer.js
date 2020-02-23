import AsyncStorage from "@react-native-community/async-storage";
import * as types from "../actions/types";

const initialState = {
  cart_total: 0,
  items_count: 0,
  cart_sub_total: 0,
  cart_quantity: 0,
  cart: []
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_CART:
      return { ...state, ...action.payload };

    case types.ADD_PRODUCT_CART:
      // console.log("payload --->>>", action.payload.product_id);

      let newCart = state.cart.slice();
      let cart_sub_total = state.cart_sub_total;
      let items_count = state.items_count;
      let cart_total = state.cart_total;
      // findIndex return 1 or -1
      const selected = newCart.findIndex(
        item => item.product_id === action.payload.product_id
      );

      if (selected >= 0) {
        if (action.payload.counter + newCart[selected].items_count < 0)
          return state;

        const addNewObj = action.payload;
        newCart[selected].items_count += action.payload.counter;

        newCart[selected].cart_sub_total =
          newCart[selected].product_sale_price * newCart[selected].items_count;
        cart_total += +action.payload.product_sale_price;
      } else {
        const addNewObj = action.payload;
        addNewObj.items_count = action.payload.counter;
        addNewObj.cart_sub_total =
          addNewObj.product_sale_price * addNewObj.items_count;

        newCart = [...newCart, addNewObj];
        cart_total += +action.payload.product_sale_price;
      }

      items_count += +action.payload.counter;

      cart_sub_total +=
        +action.payload.product_sale_price * +action.payload.counter;

      AsyncStorage.setItem("@CART", JSON.stringify(newCart));
      AsyncStorage.setItem("@TOTAL", JSON.stringify(cart_sub_total));
      AsyncStorage.setItem("@COUNTER", JSON.stringify(items_count));
      return {
        ...state,
        cart: newCart,
        items_count,
        cart_sub_total,
        cart_total
      };

    case types.REMOVE_ITEM_IN_CART:
      const itemId = action.payload.product_id;

      const counterRemoved = action.payload.items_count;
      const priceRemoved = action.payload.cart_sub_total;

      const afterremov = state.cart_total - priceRemoved;

      const cartAfterRemoved = state.cart.filter(
        item => item.product_id !== itemId
      );
      // console.log("remove ====", cartRemoved);

      AsyncStorage.setItem("@CART", JSON.stringify(cartAfterRemoved));
      AsyncStorage.setItem("@TOTAL", JSON.stringify(+afterremov));
      AsyncStorage.setItem(
        "@COUNTER",
        JSON.stringify(+(state.items_count - counterRemoved))
      );

      return {
        ...state,
        cart: [...cartAfterRemoved],
        items_count: state.items_count - counterRemoved,
        cart_sub_total: afterremov,
        cart_total: afterremov
      };
    default:
      return state;
  }
};
export default CartReducer;
