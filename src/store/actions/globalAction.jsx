import axiosInstance from '../../mock/axiosInstance'; 
import { SET_ROLES, SET_CATEGORY, CHANGE_THEME, CHANGE_LANGUAGE } from '../reducers/globalReducer';

// Action creator'ları tanımlayalım
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles });
export const setCategories = (categories) => ({ type: SET_CATEGORY, payload: categories });
export const changeTheme = (theme) => ({ type: CHANGE_THEME, payload: theme });
export const changeLanguage = (language) => ({ type: CHANGE_LANGUAGE, payload: language });

// Roles bilgisini API'dan çekip state'e ekleyen thunk action creator
export const fetchRoles = () => {
  return (dispatch) => {
    axiosInstance.get('/roles')
      .then(response => {
        // Burada response nesnesi içindeki data'ya erişip, bu veriyi setRoles action'ı ile dispatch ediyoruz
        dispatch(setRoles(response.data));
        // Eğer response üzerinde loglama yapmak istiyorsanız, burada yapmalısınız
        console.log(response.data);
      })
      .catch(error => {
        console.error('Roles fetching failed:', error);
        // Hata durumunda uygun bir işlem yapabilirsiniz
      });
  };
};