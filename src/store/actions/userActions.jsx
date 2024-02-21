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
    dispatch(setUser(response.data));
    localStorage.setItem('token', response.data.token); // Token'ı localStorage'a kaydet
    // Kullanıcıyı anasayfaya yönlendir
    window.location.href = '/home';
  } catch (error) {
    console.error("Login Error:", error);
    // Hata mesajı göster
    // Bu kısım uygulamanızın tasarımına bağlı olarak değişiklik gösterebilir
    alert("Login failed: " + error.response.data.message);
  }
};
