"use client";
import React from 'react'
import Image from 'next/image'
import LiveStock from "../../../assets/livestock.png"
import { FcGoogle } from "react-icons/fc";
import { FaRegMessage } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { Initials, loginMode } from './redux';
import { IoIosArrowBack } from "react-icons/io";
import { signIn, useSession } from 'next-auth/react';
import crypto from 'crypto';
export const SignUp = () => {



    const dispatch = useDispatch();
    const isLogin = useSelector((state: { user: Initials }) => state.user.loginMode);
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
    const callbackUrl = searchparam.get("callbackUrl");

    const handleSignIn = () => {

        const randomval = generateRandomStringNode();
        searchparam.set("state", randomval);
        signIn("google", { callbackUrl: `/googleverify?google=${randomval}` });

    }
    return (

        <div className='p-10'>
            <div className='flex flex-row w-[80%] h-[500px] lg:w-[700px] border-1 shadow-2xl lg:h-[700px]  rounded-2xl mt-20 '>


                <div style={{ backgroundColor: "white" }} className='rounded-2xl w-full lg:w-[50%]'>
                    {isLogin ?
                        <div className='w-[250px] lg:w-[350px] h-[400px] flex flex-col p-6'>

                            <div className='flex flex-row gap-3'>


                                <IoIosArrowBack className='mt-2' size={24} onClick={() => dispatch(loginMode(false))} />
                                <h2 className='font-bold text-2xl '>

                                    Continue with Email

                                </h2>

                            </div>
                            <p>
                                Well check if you have an account, and help create one if you dont.
                            </p>

                            <div className='flex flex-col'>
                                <strong>Email</strong>
                                <input type='email' placeholder='Enter your email' className='border-1 border-black p-2 rounded-xl w-[80%]' />

                                <button className='border-1 border-black p-2 rounded-xl w-[80%] bg-blue-600 cursor-pointer mt-10 text-white'>Continue</button>
                            </div>



                        </div>
                        : <div className='p-5 flex flex-col '>
                            <h1 className='font-extrabold text-3xl'>Log in or sign up in seconds</h1>
                            <p className='mt-4 font-semibold'>
                                Use your email or another service to continue with Meatruck (it’s free)!
                            </p>

                            <div className='w-[90%] h-[40px] border-1 rounded-xl flex p-2 items-center space-x-6 mt-6 cursor-pointer py-6' onClick={() => handleSignIn()}>
                                <FcGoogle size={26} className='' />
                                <p className=' font-bold'>Continue with Google</p>

                            </div>

                            <div className='w-[90%] h-[40px] border-1 rounded-xl mt-6 flex p-4 items-center space-x-6 cursor-pointer py-6'>
                                <FaRegMessage size={24} className='' />
                                <p className=' font-bold ' onClick={() => dispatch(loginMode(true))}>Continue with Email</p>

                            </div>

                            <div>
                                <p>By continuing, you agree to Canva’s Terms of Use. Read our Privacy Policy.</p>
                            </div>


                        </div>}

                </div>
                <div style={{ width: '50%', height: "100%" }} className='hidden lg:inline'>

                    <Image src={LiveStock} alt='livestock' className='object-fill h-full rounded-2xl' />
                </div>

            </div>

        </div>
    )
}
