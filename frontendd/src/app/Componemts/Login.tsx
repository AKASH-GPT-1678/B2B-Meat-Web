import React from 'react'
import { useDispatch } from 'react-redux';
import {loginMode } from './redux';
import { IoIosArrowBack } from "react-icons/io";
export const Login = () => {

    const dispatch = useDispatch();


    return (
        <div>
            <div className='w-[250px] lg:w-[350px] h-[400px] flex flex-col p-6'>

                <div className='flex flex-row gap-3'>

                    <button onClick={() => alert('clicked')}>Make Login</button>
                    <IoIosArrowBack className='mt-2' size={24} onClick={() => dispatch(loginMode(true))} />
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
        </div>
    )
}
