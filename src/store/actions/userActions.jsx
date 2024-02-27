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
    const loginResponse = await axiosInstance.post("/login", formData);
    localStorage.setItem('token', loginResponse.data.token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${loginResponse.data.token}`;

    const verifyResponse = await axiosInstance.get("/verify");
    // `/verify` isteğinin başarılı olması durumunda kullanıcı bilgilerini güncelle
    dispatch(setUser(verifyResponse.data));

    toast.success("Başarıyla giriş yapıldı!");
    return { success: true };
  } catch (error) {
    console.error("Login Error:", error);
    toast.error('Giriş başarısız: ' + (error.response?.data.message || error.message));
    return { success: false, message: error.response?.data.message || error.message };
  }
};
