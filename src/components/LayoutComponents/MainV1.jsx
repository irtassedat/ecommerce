import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../../store/actions/userActions';
import axiosInstance from '../../mock/axiosInstance';
import { ToastContainer } from 'react-toastify';
import ContentWrapper from "./ContentWrapper";
import Footer from "./Footer";
import Header from "./Header";

export default function MainV1() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axiosInstance.get('/verify')
            .then(response => {
                dispatch(setUser(response.data));
                localStorage.setItem('token', response.data.token);
                axiosInstance.defaults.headers.common['Authorization'] = response.data.token;
            })
            .catch(error => {
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
