// src/store/reducers/shoppingCartReducer.js
import {
  SET_CART_LIST,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_TO_CART,
  INCREMENT_PRODUCT_COUNT,
  DECREMENT_PRODUCT_COUNT,
  REMOVE_FROM_CART,
  TOGGLE_PRODUCT_CHECKED,
  FETCH_ADDRESSES_SUCCESS,
  ADD_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_SUCCESS,
  FETCH_CARDS_SUCCESS,
  ADD_CARD_SUCCESS,
  UPDATE_CARD_SUCCESS,
  DELETE_CARD_SUCCESS,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  FETCH_CART_DETAILS_SUCCESS,
  RESET_CART
} from '../actionTypes';

const initialState = {
  cartList: [], // Alışveriş sepetindeki ürünler
  payment: {}, // Ödeme bilgisi
  addressList: [], // Kullanıcının kaydedilmiş adresleri
  currentAddress: {}, // Seçili veya yeni eklenen adres
  cartDetails: {}, // Sepet detayları
  provinces: [],
  districts: [],
  neighborhoods: [],
  cardList: [], // Kullanıcının kaydedilmiş kartları
};

export const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_LIST:
      return { ...state, cartList: action.payload };
    case SET_PAYMENT:
      return { ...state, payment: action.payload };
    case SET_ADDRESS:
      return { ...state, currentAddress: action.payload };
    case FETCH_ADDRESSES_SUCCESS:
      return { ...state, addressList: action.payload };
    case ADD_ADDRESS_SUCCESS:
      return { ...state, addressList: [...state.addressList, action.payload], currentAddress: action.payload };
    case 'CONFIRM_CART':
      return {
        ...state,
        cartDetails: action.payload,
      };
    case UPDATE_ADDRESS_SUCCESS:
      const updatedAddressList = state.addressList.map(address =>
        address.id === action.payload.id ? action.payload : address
      );
      const updatedCurrentAddress = state.currentAddress.id === action.payload.id ? action.payload : state.currentAddress;
      return { ...state, addressList: updatedAddressList, currentAddress: updatedCurrentAddress }; 
    case ADD_TO_CART:
      // Sepete ürün ekleme veya var olan ürünün sayısını artırma
      const productExists = state.cartList.find(item => item.product.id === action.payload.id);
      if (productExists) {
        return {
          ...state,
          cartList: state.cartList.map(item =>
            item.product.id === action.payload.id ? { ...item, count: item.count + 1, checked: true } : item
          )
        };
      } else {
        return {
          ...state,
          cartList: [...state.cartList, { count: 1, checked: true, product: action.payload }]
        };
      }
    case INCREMENT_PRODUCT_COUNT:
      // Sepetteki ürün sayısını artırma
      return {
        ...state,
        cartList: state.cartList.map(item =>
          item.product.id === action.payload ? { ...item, count: item.count + 1 } : item
        )
      };
    case DECREMENT_PRODUCT_COUNT:
      // Sepetteki ürün sayısını azaltma, sayı 1 ise kaldırma
      return {
        ...state,
        cartList: state.cartList.map(item => {
          if (item.product.id === action.payload) {
            return item.count > 1 ? { ...item, count: item.count - 1 } : null;
          }
          return item;
        }).filter(item => item != null)
      };
    case REMOVE_FROM_CART:
      // Ürünü sepetten kaldırma
      return {
        ...state,
        cartList: state.cartList.filter(item => item.product.id !== action.payload)
      };
    case TOGGLE_PRODUCT_CHECKED:
      // Ürünün seçim durumunu değiştirme
      return {
        ...state,
        cartList: state.cartList.map(item =>
          item.product.id === action.payload
            ? { ...item, checked: !item.checked }
            : item
        ),
      };
    case DELETE_ADDRESS_SUCCESS:
      const isCurrentAddressDeleted = state.currentAddress.id === action.payload;
      return {
        ...state,
        addressList: state.addressList.filter(address => address.id !== action.payload),
        currentAddress: isCurrentAddressDeleted ? {} : state.currentAddress,
      };
    case FETCH_CARDS_SUCCESS:
      return { ...state, cardList: action.payload };
    case ADD_CARD_SUCCESS:
      return { ...state, cardList: [...state.cardList, action.payload] };
    case UPDATE_CARD_SUCCESS:
      const updatedCardList = state.cardList.map(card =>
        card.id === action.payload.id ? action.payload : card
      );
      return { ...state, cardList: updatedCardList };
    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        cardList: state.cardList.filter(card => card.id !== action.payload),
      };  
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        cartList: [],
        payment: {},
        currentAddress: {},
        cartDetails: {},
      };
    case CREATE_ORDER_FAILURE:
      return {
        ...state,
      };
    case RESET_CART:
      return {
        ...state,
        cartList: [],
        payment: {},
        currentAddress: {},
        cartDetails: {},
      };
    case FETCH_CART_DETAILS_SUCCESS:
      return { ...state, cartDetails: action.payload };
    default:
      return state;
  }
};
