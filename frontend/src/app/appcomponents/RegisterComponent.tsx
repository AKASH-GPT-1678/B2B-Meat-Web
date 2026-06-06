'use client';

import React from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/axios';

export const RegisterComponent = () => {

    const router = useRouter();

    const [formData, setFormData] = React.useState({
        email: '',
        username: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async () => {
        try {

            const response = await apiClient.post(
                '/auth/register',
                formData
            );

            console.log(response.data);

            router.push(
                `/login`
            );

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-full lg:w-[350px] bg-white shadow-md rounded-xl p-2 lg:p-6 flex flex-col gap-6">

                <div className="flex items-center gap-3">
                    <IoIosArrowBack
                        size={24}
                        className="cursor-pointer"
                        onClick={() => router.back()}
                    />
                    <h2 className="font-bold text-2xl flex-1 text-center">
                        Create Account
                    </h2>
                </div>

                <p className="text-sm text-gray-600">
                    Create your account to continue.
                </p>

                <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >

                    <div>
                        <label className="font-semibold text-sm">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 p-2 rounded-xl w-full mt-1"
                        />
                    </div>

                    <div>
                        <label className="font-semibold text-sm">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 p-2 rounded-xl w-full mt-1"
                        />
                    </div>

                    <div>
                        <label className="font-semibold text-sm">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 p-2 rounded-xl w-full mt-1"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                    >
                        Register
                    </button>

                </form>

                <p
                    className="text-sm text-blue-600 cursor-pointer text-center"
                    onClick={() => router.push('/login')}
                >
                    Already have an account? Login
                </p>

            </div>
        </div>
    );
};