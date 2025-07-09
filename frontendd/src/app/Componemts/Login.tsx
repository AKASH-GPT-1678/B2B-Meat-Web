import React from 'react'
import { useDispatch } from 'react-redux';
import { loginMode } from './redux';
import { IoIosArrowBack } from "react-icons/io";
export const Login = () => {

    const dispatch = useDispatch();


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-[250px] lg:w-[350px] h-auto bg-white shadow-md rounded-xl p-6 flex flex-col gap-6">

                {/* Header with back icon and title */}
                <div className="flex items-center gap-3">
                    <IoIosArrowBack
                        className="cursor-pointer text-gray-600 hover:text-black"
                        size={24}
                        onClick={() => dispatch(loginMode(true))}
                    />
                    <h2 className="font-bold text-2xl flex-1 text-center">Continue with Email</h2>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600">
                    We'll check if you have an account and help create one if you don’t.
                </p>

                {/* Email Input and Button */}
                <div className="flex flex-col gap-4">
                    <label className="font-semibold text-sm">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="border border-gray-300 p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button className="bg-blue-600 text-white p-2 rounded-xl w-full hover:bg-blue-700 transition">
                        Continue
                    </button>
                </div>

                {/* Optional: Debug button */}
                <button
                    onClick={() => alert('clicked')}
                    className="text-sm text-blue-500 hover:underline self-end"
                >
                    Make Login
                </button>
            </div>
        </div>

    )
}
