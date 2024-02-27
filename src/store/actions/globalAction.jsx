import axiosInstance from '../../mock/axiosInstance'; 
import { SET_ROLES, SET_CATEGORIES, CHANGE_THEME, CHANGE_LANGUAGE } from '../reducers/globalReducer';

export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles });
export const setCategories = (categories) => ({ type: SET_CATEGORIES, payload: categories });
export const changeTheme = (theme) => ({ type: CHANGE_THEME, payload: theme });
export const changeLanguage = (language) => ({ type: CHANGE_LANGUAGE, payload: language });

// Roles bilgisini API'dan çekip state'e ekleyen thunk action creator
export const fetchRoles = () => {
  return (dispatch) => {
    axiosInstance.get('/roles')
      .then(response => {
        dispatch(setRoles(response.data));
        console.log(response.data);
      })
      .catch(error => {
        console.error('Roles fetching failed:', error);
      });
  };
};
export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/categories');
    dispatch(setCategories(response.data));
  } catch (error) {
    console.error('Fetching categories failed:', error);
  }
};
