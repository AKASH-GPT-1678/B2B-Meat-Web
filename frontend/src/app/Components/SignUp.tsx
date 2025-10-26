"use client";
import React from 'react'
import Image from 'next/image'
import LiveStock from "../../../assets/livestock.png"
import { useDispatch } from 'react-redux';

import { setGoogleVerified } from './redux-persit';
import { signIn, useSession } from 'next-auth/react';
import crypto from 'crypto';
import { useRouter } from 'next/navigation';
import { Login } from '../forms/Login';
export const SignUp = () => {


    const [userEmail, setUserEmail] = React.useState("");
    const dispatch = useDispatch();
    const router = useRouter();


    function generateRandomStringNode() {
        // Calculate the number of bytes needed for the desired length
        // Each byte can represent two hexadecimal characters
        const bytes = Math.ceil(8 / 2);
        return crypto.randomBytes(bytes).toString('hex').slice(0, 8);
    }


    const searchparam = new URLSearchParams(window.location.search);



    const handleSignIn = () => {

        const randomval = generateRandomStringNode();

        searchparam.set("google", randomval);

        dispatch(setGoogleVerified(randomval));

        signIn("google", { callbackUrl: `/googleverify?google=${randomval}` });

    };
    return (
        <div className='p-4 md:p-6'>
            <div className='flex flex-col lg:flex-row w-full max-w-[800px] mx-auto h-auto lg:h-[700px] border shadow-2xl rounded-2xl mt-10'>

              
                <div className='w-full lg:w-1/2 bg-white rounded-2xl md:p-4 flex flex-col justify-center'>



                    <Login />


                </div>


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

