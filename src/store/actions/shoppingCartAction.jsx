import { TOGGLE_PRODUCT_CHECKED } from '../reducers/shoppingCartReducer';
import axiosInstance from '../../mock/axiosInstance';

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

export const fetchAddresses = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/user/address');
    dispatch({ type: 'FETCH_ADDRESSES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_ADDRESSES_ERROR', payload: error.response });
  }
};

// Yeni adres ekleme
export const addAddress = (addressData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/user/address', addressData);
    dispatch({ type: 'ADD_ADDRESS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'ADD_ADDRESS_ERROR', payload: error.response });
  }
};

// Adres güncelleme
export const updateAddress = (addressId, addressData) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/user/address/${addressId}`, addressData);
    dispatch({ type: 'UPDATE_ADDRESS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'UPDATE_ADDRESS_ERROR', payload: error.response });
  }
};

export const incrementProductCount = (productId) => {
    return {
        type: 'INCREMENT_PRODUCT_COUNT',
        payload: productId
    };
};

export const decrementProductCount = (productId) => (dispatch, getState) => {
  const { shoppingCart } = getState();
  const product = shoppingCart.cartList.find(item => item.product.id === productId);
  
  // Ürün sayısı 1'den büyükse, sayıyı azalt
  if (product && product.count > 1) {
      dispatch({
          type: 'DECREMENT_PRODUCT_COUNT',
          payload: productId
      });
  } else {
      alert('Ürün sayısı 1’den az olamaz.');
  }
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
