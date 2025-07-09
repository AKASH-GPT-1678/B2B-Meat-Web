
"use client";
import { useSearchParams } from 'next/navigation'
import React from 'react'
import Image from 'next/image';
import LiveStock from "../../../assets/livestock.png";
import PasswordVerify from '../Componemts/PasswordVerify';
import { email } from 'zod/v4-mini';
import OTPVerify from '../Componemts/OTPVerify';
import { fa } from 'zod/v4/locales';


const page = () => {

    const [isOtp, setIsOtp] = React.useState(false);
    const searchparams = useSearchParams();
    const state = searchparams.get("email");
    const mode = searchparams.get("mode");


    React.useEffect(() => {
        if(mode== "otp"){
            setIsOtp(true)
        }

        
    } , [])


  


    return (
       <div className='flex flex-col items-center justify-center min-h-screen'>
    <div className='flex flex-row max-w-[800px] max-h-[1000px] justify-center items-center shadow-2xl'>
        <div className='w-full lg:w-1/2'>
            {isOtp ? <OTPVerify /> : <PasswordVerify email={state as string} />}
        </div>
        <div className='w-1/2 hidden lg:inline h-[600px] rounded-2xl'>
            <Image src={LiveStock} className='w-full h-full object-cover rounded-2xl' alt='images' />
        </div>
    </div>
</div>

    )
}

export default page
