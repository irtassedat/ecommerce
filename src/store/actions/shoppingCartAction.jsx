import axiosInstance from '../../mock/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SET_ADDRESS,
  SET_CART_LIST,
  SET_PAYMENT,
  ADD_CARD_SUCCESS,
  FETCH_CARDS_SUCCESS,
  UPDATE_CARD_SUCCESS,
  DELETE_CARD_SUCCESS,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  FETCH_CART_DETAILS_SUCCESS,
  RESET_CART,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  SET_CART_ITEMS,
  SET_FAVORITE_ITEMS
} from '../actionTypes';

// Sepetteki ürün listesini ayarlamak için
export const setCartListAction = (cartList) => {
  return { type: SET_CART_LIST, payload: cartList };
};

// Sepetteki ürün listesini localStorage'dan yüklemek için
export const setCartItems = (cartItems) => {
  return { type: SET_CART_ITEMS, payload: cartItems };
};

// Favori ürün listesini localStorage'dan yüklemek için
export const setFavoriteItems = (favoriteItems) => {
  return { type: SET_FAVORITE_ITEMS, payload: favoriteItems };
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

export const addToFavorites = (product) => {
  return {
    type: ADD_TO_FAVORITES,
    payload: product
  };
};

export const removeFromFavorites = (productId) => {
  return {
    type: REMOVE_FROM_FAVORITES,
    payload: productId
  };
};

export const fetchAddresses = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token'); // Token'ı localStorage'dan al
    const response = await axiosInstance.get('/user/address', {
      headers: {
        Authorization: token, // Her istek için token'ı ekleyin
      },
    });
    dispatch({ type: 'FETCH_ADDRESSES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_ADDRESSES_ERROR', payload: error.response });
  }
};

// Yeni adres ekleme
export const addAddress = (addressData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.post('/user/address', addressData, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: 'ADD_ADDRESS_SUCCESS', payload: response.data });
    dispatch(setAddressAction(response.data[0])); // Eğer API diziyi döndürüyorsa ve güncellenen adres ilk eleman ise
  } catch (error) {
    dispatch({ type: 'ADD_ADDRESS_ERROR', payload: error.response });
  }
};

// Adres güncelleme
export const updateAddress = (addressId, addressData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.put(`/user/address/`, addressData, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: 'UPDATE_ADDRESS_SUCCESS', payload: response.data });
    dispatch(setAddressAction(response.data[0])); // Eğer API diziyi döndürüyorsa ve güncellenen adres ilk eleman ise
  } catch (error) {
    dispatch({ type: 'UPDATE_ADDRESS_ERROR', payload: error.response });
  }
};

export const deleteAddress = (addressId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    await axiosInstance.delete(`/user/address/${addressId}`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: 'DELETE_ADDRESS_SUCCESS', payload: addressId });
    dispatch(fetchAddresses());
  } catch (error) {
    dispatch({ type: 'DELETE_ADDRESS_ERROR', payload: error.response });
  }
};

// Yeni adres ekleme işlemi başarılı olduktan sonra adres listesini yeniden fetch eden işlem
export const addAddressAndUpdateList = (addressData) => async (dispatch) => {
  try {
    await dispatch(addAddress(addressData));
    await dispatch(fetchAddresses()); // Başarıyla adres eklendikten sonra listeyi güncelle
  } catch (error) {
    console.error("Adres ekleme veya listeyi güncelleme sırasında hata oluştu", error);
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

export const confirmCart = (cartDetails) => ({
  type: 'CONFIRM_CART',
  payload: cartDetails,
});

export const fetchCards = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token'); // Token'ı localStorage'dan al
    const response = await axiosInstance.get('/user/card', {
      headers: {
        Authorization: token  // Her istek için token'ı ekleyin
      },
    });
    console.log("API'den gelen kartlar:", response.data);  // API yanıtını konsola yazdır
    dispatch({ type: FETCH_CARDS_SUCCESS, payload: response.data });
    toast.success("Kartlar başarıyla yüklendi.");
  } catch (error) {
    console.error("Kartları yüklerken hata oluştu", error);
    toast.error("Kartları yüklerken bir hata oluştu.");
  }
};

// Kart ekleme örneği
export const addCard = (cardData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.post('/user/card', cardData, {
      headers: { Authorization: token }
    });
    dispatch({ type: ADD_CARD_SUCCESS, payload: response.data });
    dispatch(fetchCards());  // Eklendikten sonra kart listesini yeniden çek
    toast.success("Kart başarıyla eklendi.");
  } catch (error) {
    console.error("Kart eklerken hata oluştu", error);
    toast.error("Kart eklenirken bir hata oluştu.");
  }
};

export const updateCard = (cardId, cardData) => async (dispatch) => {
  try {
    const response = await axiosInstance.put('/user/card', { ...cardData, id: cardId }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    dispatch({ type: UPDATE_CARD_SUCCESS, payload: response.data });
    dispatch(fetchCards());  // Güncellendikten sonra kart listesini yeniden çek
    toast.success('Kart başarıyla güncellendi.');
  } catch (error) {
    toast.error('Kart güncellenirken bir hata oluştu.');
  }
};

export const deleteCard = (cardId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    await axiosInstance.delete(`/user/card/${cardId}`, {
      headers: { Authorization: token }
    });
    dispatch({ type: DELETE_CARD_SUCCESS, payload: cardId });
    dispatch(fetchCards());  // Silindikten sonra kart listesini yeniden çek
    toast.success("Kart başarıyla silindi.");
  } catch (error) {
    console.error("Kart silerken hata oluştu", error);
    toast.error("Kart silinirken bir hata oluştu.");
  }
};

export const createOrder = (orderData) => async (dispatch) => {
  try {
    console.log('API çağrısı başlıyor', orderData);
    const token = localStorage.getItem('token');
    const response = await axiosInstance.post('/order', orderData, {
      headers: { Authorization: token }
    });
    console.log('API çağrısı başarılı', response.data);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data });
    alert("Sipariş başarıyla oluşturuldu. Tebrikler!");
  } catch (error) {
    console.error("Sipariş oluşturulurken hata oluştu", error);
    dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
    alert("Sipariş oluşturulurken bir hata oluştu.");
  }
};

export const resetCart = () => {
  return { type: RESET_CART };
};
