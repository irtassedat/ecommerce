import { toast } from 'react-toastify';
import axiosInstance from '../../mock/axiosInstance';
import { SET_USER, CLEAR_USER } from "../userTypes";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const loginUser = (formData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/login", formData);
    // Başarılı giriş sonrası kullanıcı bilgileri ve token ayarlanıyor
    dispatch(setUser({ ...response.data.user, token: response.data.token }));
    localStorage.setItem('token', response.data.token); // Token'ı localStorage'a kaydet
    toast.success("Başarıyla giriş yapıldı!");
    return { success: true };
  } catch (error) {
    console.error("Login Error:", error);
    toast.error('Giriş başarısız: ' + (error.response?.data.message || error.message));
    return { success: false, message: error.response?.data.message || error.message };
  }
};