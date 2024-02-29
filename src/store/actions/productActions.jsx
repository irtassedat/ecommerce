import axios from '../../mock/axiosInstance';

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

export const fetchProducts = (category = "", filter = "", sort = "", limit = "", offset = "", page = 1) => async (dispatch) => {
  dispatch(setFetchState("FETCHING"));
  try {
    const response = await axios.get('/products', {
      params: { category, filter, sort, limit, offset },
    });
    dispatch(setProducts(response.data.products));
    dispatch(setProductCount(response.data.total));
    dispatch(setPageCount(Math.ceil(response.data.total / limit))); // Kullanılan limit değeri
    dispatch(setActivePage(page)); // Dinamik olarak güncellenen sayfa numarası
    dispatch(setFetchState("FETCHED"));
  } catch (error) {
    dispatch(setFetchState("FETCH_FAILED"));
    console.error('Ürünleri çekerken bir hata oluştu:', error);
  }
};



export const fetchProductsWithId = (id) => async (dispatch) => {
  dispatch(setFetchState("FETCHING"));
  try {
    const response = await axios.get(`/products/${id}`);
    // Belirli bir ürün için action, örneğin:
    // dispatch(setCurrentProduct(response.data));
    dispatch(setFetchState("FETCHED"));
  } catch (error) {
    dispatch(setFetchState("FETCH_FAILED"));
    console.error('Ürün detayları çekerken bir hata oluştu:', error);
  }
};
