export const SET_CART_LIST = "SET_CART_LIST";
export const SET_PAYMENT = "SET_PAYMENT";
export const SET_ADDRESS = "SET_ADDRESS";
export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREMENT_PRODUCT_COUNT = 'INCREMENT_PRODUCT_COUNT';
export const DECREMENT_PRODUCT_COUNT = 'DECREMENT_PRODUCT_COUNT';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const TOGGLE_PRODUCT_CHECKED = 'TOGGLE_PRODUCT_CHECKED';
export const FETCH_ADDRESSES_SUCCESS = "FETCH_ADDRESSES_SUCCESS";
export const ADD_ADDRESS_SUCCESS = "ADD_ADDRESS_SUCCESS";
export const UPDATE_ADDRESS_SUCCESS = "UPDATE_ADDRESS_SUCCESS";

const initialState = {
  cartList: [], // Alışveriş sepetindeki ürünler
  payment: {}, // Ödeme bilgisi
  addressList: [], // Kullanıcının kaydedilmiş adresleri
  currentAddress: {}, // Seçili veya yeni eklenen adres
  cartDetails: {}, // 
};

export const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_LIST:
      return { ...state, cartList: action.payload };
    case SET_PAYMENT:
      return { ...state, payment: action.payload };
    case SET_ADDRESS:
      return { ...state, address: action.payload };
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
      return { ...state, addressList: updatedAddressList, currentAddress: action.payload };  
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
      
    default:
      return state;
  }
};
