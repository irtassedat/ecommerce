import {
    SET_ADDRESS,
    SET_CART_LIST,
    SET_PAYMENT,
  } from "../reducers/shoppingCartReducer";
  
  // Sepetteki ürün listesini ayarlamak için bir action
  export const setCartListAction = (cartList) => {
    return { type: SET_CART_LIST, payload: cartList };
  };
  
  // Ödeme bilgisini ayarlamak için bir action
  export const setPaymentAction = (payment) => {
    return { type: SET_PAYMENT, payload: payment };
  };
  
  // Adres bilgisini ayarlamak için bir action
  export const setAddressAction = (address) => {
    return { type: SET_ADDRESS, payload: address };
  };
  