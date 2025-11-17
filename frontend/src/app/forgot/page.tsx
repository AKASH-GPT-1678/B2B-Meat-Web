'use client';
import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/navigation';

const ForgitPassword = () => {
    const [email, setEmail] = React.useState('');
    const [responseMessage, setResponseMessage] = React.useState('');
    const router = useRouter();
    const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;


    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            const encodedEmail = encodeURIComponent(email);
            const url = `${endpoint}/auth/forgotPassword?email=${encodedEmail}`;

            const response = await axios.post<string>(url);
            console.log(response.data);
            if (response.data == "Otp Sent Successfully") {
                router.push(`/forgot/verify?email=${email}`);
            }

            setResponseMessage(response.data);
        } catch (error) {
            console.error('Forgot password error:', error);
            setResponseMessage('Failed to send OTP. Try again.');
        }
    };

    interface OtpRequestDto {
        email: string;
        otp: string;
    }

    const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
        try {
            const requestData: OtpRequestDto = {
                email: email,
                otp: otp
            };

            const response = await axios.post<boolean>(
                'http://localhost:8080/auth/forgotOtp',
                requestData
            );
            console.log(response.data);

            return response.data; // true or false
        } catch (error) {
            console.error('OTP verification failed:', error);
            return false;
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleForgotPassword} className="bg-white p-6 rounded-2xl shadow-md w-[90%] max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-center text-gray-700">Forgot Password</h2>

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email address</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Send OTP
                </button>

                {responseMessage && <p className="text-sm text-center text-green-600">{responseMessage}</p>}
            </form>
        </div>
    );
};

export default ForgitPassword;
