import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/actions/userActions';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const result = await dispatch(loginUser(data));
        if (result.success) {
            history.push('/');
        } else {
            toast.error(result.message || 'Login failed.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-teal-500">
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="email" 
                            type="email" 
                            {...register("email", { required: "Email is required", pattern: /^\S+@\S+\.\S+$/ })}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                            id="password" 
                            type="password" 
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                    </div>

                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                            type="submit">
                            Login
                        </button>
                    </div>
                </form>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </div>
        </div>
    );
}
