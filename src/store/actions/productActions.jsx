
import {
    SET_PRODUCT,
    SET_PRODUCTCOUNT,
    SET_PAGECOUNT,
    SET_ACTIVEPAGE,
    CHANGE_FETCHSTAT,
  } from "../reducers/productReducer";
  
  export const setProducts = (products) => {
    return { type: SET_PRODUCT, payload: products };
  };
  
  export const setProductCount = (count) => {
    return { type: SET_PRODUCTCOUNT, payload: count };
  };
  
  export const setPageCount = (count) => {
    return { type: SET_PAGECOUNT, payload: count };
  };
  
  export const setActivePage = (page) => {
    return { type: SET_ACTIVEPAGE, payload: page };
  };
  
  export const setFetchState = (state) => {
    return { type: CHANGE_FETCHSTAT, payload: state };
  };
  