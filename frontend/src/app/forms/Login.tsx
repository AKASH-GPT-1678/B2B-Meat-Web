'use client';
import React from 'react'
import { useDispatch } from 'react-redux';
import { IoIosArrowBack } from "react-icons/io";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import apiClient from '@/lib/axios';
import { useAppDispatch } from '@/utils/reduxhook';
import { setisLoggedIn, setToken } from '../appcomponents/redux-persit';

export const Login = () => {
    const router = useRouter();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
const dispatch = useAppDispatch();
    

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const response = await apiClient.post('/auth/login', {
                email,
                password,
            });

            console.log(response.data);
            dispatch(setisLoggedIn(true));
            dispatch(setToken(response.data.data.token))
            console.log(response.data.token)

            // Store token if backend returns one
            // localStorage.setItem('token', response.data.token);

            router.push('/');
        } catch (error) {
            console.error(error);
            alert('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center max-h-fit">
            <div className="w-full lg:w-[350px] h-auto bg-white shadow-md rounded-xl p-2 lg:p-6 flex flex-col gap-6">

                <div className="flex items-center gap-3">
                    <IoIosArrowBack
                        className="cursor-pointer text-gray-600 hover:text-black"
                        size={24}
                        onClick={() => router.back()}
                    />
                    <h2 className="font-bold text-2xl flex-1 text-center">
                        Login
                    </h2>
                </div>

                <p className="text-sm text-gray-600">
                    Enter your email and password to continue.
                </p>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="font-semibold text-sm block mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="font-semibold text-sm block mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white p-3 rounded-xl w-full hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <button
                    className="bg-red-600 text-white p-3 rounded-xl w-full hover:bg-red-700 transition"
                    onClick={() => signIn('google')}
                >
                    Sign in with Google
                </button>

                <p
                    className="text-sm text-blue-600 cursor-pointer flex justify-end"
                    onClick={() => router.push('/forgot')}
                >
                    Forgot Password?
                </p>

                <p className="text-sm text-center">
                    Don't have an account?{' '}
                    <span
                        className="text-blue-600 cursor-pointer"
                        onClick={() => router.push('/register')}
                    >
                        Register
                    </span>
                </p>

            </div>
        </div>
    );
};