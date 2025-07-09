"use client";
import React from 'react'
import Image from 'next/image'
import LiveStock from "../../../assets/livestock.png"
import { FcGoogle } from "react-icons/fc";
import { FaRegMessage } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { Initials, loginMode } from './redux';
import { InitialsD, setGoogleVerified } from './redux-persit';
import { IoIosArrowBack } from "react-icons/io";
import { signIn, useSession } from 'next-auth/react';
import crypto from 'crypto';
import { set } from 'zod/v4-mini';
import axios from 'axios';
export const SignUp = () => {


    const [userEmail, setUserEmail] = React.useState("");
    const dispatch = useDispatch();
    const isLogin = useSelector((state: { user: Initials }) => state.user.loginMode);
    const GoogleString = useSelector((state: { user: InitialsD }) => state.user.googleVerified);
    const session = useSession({
        required: true,
        // onUnauthenticated() {
        //     alert("You are not logged in");

        // }
        // ,

    });
    function generateRandomStringNode() {
        // Calculate the number of bytes needed for the desired length
        // Each byte can represent two hexadecimal characters
        const bytes = Math.ceil(8 / 2);
        return crypto.randomBytes(bytes).toString('hex').slice(0, 8);
    }


    const searchparam = new URLSearchParams(window.location.search);

    const VerifyEmail = async () => {

        try {

            const response = await axios.get(`http://localhost:8080/auth/userVerify?email=${userEmail}`);
            console.log(response.data);
            if (response.data.status == "OTP Verification") {
                window.location.href = `/verify?email=${userEmail}&mode=otp`;

            } else if (response.data.status == "Password verification") {
                window.location.href = `/verify?email=${userEmail}&mode=password`;


            }
            else {
                alert(response.data.message);
            }

        } catch (error) {
            console.error(error);

        }
    }


    const handleSignIn = () => {

        const randomval = generateRandomStringNode();

        searchparam.set("google", randomval);

        dispatch(setGoogleVerified(randomval));

        signIn("google", { callbackUrl: `/googleverify?google=${randomval}` });

    }
    return (
        <div className='p-4 sm:p-10'>
            <div className='flex flex-col lg:flex-row w-full max-w-[800px] mx-auto h-auto lg:h-[700px] border shadow-2xl rounded-2xl mt-10'>

                {/* LEFT SIDE */}
                <div className='w-full lg:w-1/2 bg-white rounded-2xl p-6 flex flex-col justify-center'>
                    {isLogin ? (
                        <div className='w-full sm:w-[350px] h-auto flex flex-col gap-4'>

                            <div className='flex flex-row gap-3 items-center'>
                                <IoIosArrowBack className='mt-1 cursor-pointer' size={24} onClick={() => dispatch(loginMode(false))} />
                                <h2 className='font-bold text-2xl'>Continue with Email</h2>
                            </div>

                            <p>We’ll check if you have an account, and help create one if you don’t.</p>

                            <div className='flex flex-col gap-2'>
                                <strong>Email</strong>
                                <input
                                    type='email'
                                    placeholder='Enter your email'
                                    className='border border-black p-2 rounded-xl w-full'
                                    onChange={(e) => setUserEmail(e.target.value)}
                                />
                                <button
                                    className='bg-blue-600 text-white p-2 rounded-xl w-full mt-4'
                                    onClick={() => VerifyEmail()}>
                                    Continue
                                </button>
                            </div>

                        </div>
                    ) : (
                        <div className='flex flex-col gap-6'>
                            <h1 className='font-extrabold text-3xl'>Log in or sign up in seconds</h1>
                            <p className='font-semibold'>Use your email or another service to continue with Meatruck (it’s free)!</p>

                            <div
                                className='w-full border rounded-xl flex items-center gap-4 p-4 cursor-pointer'
                                onClick={() => handleSignIn()}>
                                <FcGoogle size={26} />
                                <p className='font-bold'>Continue with Google</p>
                            </div>

                            <div
                                className='w-full border rounded-xl flex items-center gap-4 p-4 cursor-pointer'
                                onClick={() => dispatch(loginMode(true))}>
                                <FaRegMessage size={24} />
                                <p className='font-bold'>Continue with Email</p>
                            </div>

                            <p className='text-sm'>By continuing, you agree to Canva’s Terms of Use. Read our Privacy Policy.</p>
                        </div>
                    )}

                    <h1>{GoogleString}</h1>
                </div>

                {/* RIGHT SIDE IMAGE */}
                <div className='hidden lg:block lg:w-1/2 h-full'>
                    <Image
                        src={LiveStock}
                        alt='livestock'
                        className='object-cover h-full w-full rounded-r-2xl'
                    />
                </div>

            </div>
        </div>

    )
};

