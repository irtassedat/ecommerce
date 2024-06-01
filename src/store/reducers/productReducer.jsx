export const SET_PRODUCT = "SET_PRODUCT";
export const SET_PRODUCTCOUNT = "SET_PRODUCTCOUNT";
export const SET_PAGECOUNT = "SET_PAGECOUNT";
export const SET_ACTIVEPAGE = "SET_ACTIVEPAGE";
export const CHANGE_FETCHSTAT = "CHANGE_FETCHSTAT";

export const FETCH_STATES = {
  NotFetched: "NOT_FETCHED",
  Fetching: "FETCHING",
  Fetched: "FETCHED",
  FetchFailed: "FETCH_FAILED",
};

const initialState = {
  productList: [],
  productCount: 0,
  pageCount: 0,
  activePage: 1,
  fetchState: FETCH_STATES.NotFetched,
};


export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return { ...state, productList: action.payload };
    case SET_PRODUCTCOUNT:
      return { ...state, productCount: action.payload };
    case SET_PAGECOUNT:
      return { ...state, pageCount: action.payload };
    case SET_ACTIVEPAGE:
      return { ...state, activePage: action.payload };
    case CHANGE_FETCHSTAT:
      return { ...state, fetchState: action.payload };
    case 'products/fetchById/fulfilled':
      return { ...state, currentProduct: action.payload };
    case 'products/fetchById/rejected':
      return { ...state, currentProduct: null, fetchState: FETCH_STATES.FetchFailed };
    default:
      return state;
  }
};
