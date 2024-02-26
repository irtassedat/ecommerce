import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../../store/actions/userActions';
import axiosInstance from '../../mock/axiosInstance';
import { ToastContainer } from 'react-toastify';
import ContentWrapper from "./ContentWrapper";
import Footer from "./Footer";
import Header from "./Header";

export default function Main() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axiosInstance.get('/verify')
            .then(response => {
                // Token doğrulandı, kullanıcı bilgilerini store'a kaydet
                dispatch(setUser(response.data));
                // Token'ı yenile, bu örnekte backend tarafından yenilenmiş token dönülüyor varsayılmıştır
                localStorage.setItem('token', response.data.token);
                axiosInstance.defaults.headers.common['Authorization'] = response.data.token;
            })
            .catch(error => {
                // Token doğrulanamadı, kullanıcı bilgilerini temizle
                dispatch(clearUser());
                localStorage.removeItem('token');
                delete axiosInstance.defaults.headers.common['Authorization'];
            });
        }
    }, [dispatch]);

    return (
      <>
        <Header />
        <ContentWrapper />
        <Footer />
        <ToastContainer />
      </>
    );
}
