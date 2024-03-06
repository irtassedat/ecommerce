import {
    SET_ADDRESS,
    SET_CART_LIST,
    SET_PAYMENT,
  } from "../reducers/shoppingCartReducer";
  
  // Sepetteki ürün listesini ayarlamak için
  export const setCartListAction = (cartList) => {
    return { type: SET_CART_LIST, payload: cartList };
  };
  
  // Ödeme bilgisini ayarlamak için
  export const setPaymentAction = (payment) => {
    return { type: SET_PAYMENT, payload: payment };
  };
  
  // Adres bilgisini ayarlamak için
  export const setAddressAction = (address) => {
    return { type: SET_ADDRESS, payload: address };
  };
  export const addToCart = (product) => {
    return {
        type: 'ADD_TO_CART',
        payload: product
    };
};

export const incrementProductCount = (productId) => {
    return {
        type: 'INCREMENT_PRODUCT_COUNT',
        payload: productId
    };
};

export const decrementProductCount = (productId) => {
    return {
        type: 'DECREMENT_PRODUCT_COUNT',
        payload: productId
    };
};

export const removeFromCart = (productId) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: productId
    };
};
  
// Ürün seçimini değiştirmek için action
export const toggleProductChecked = (productId) => {
  return {
      type: TOGGLE_PRODUCT_CHECKED,
      payload: productId
  };
};
