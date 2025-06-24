"use client";
import React from 'react'
import Image from 'next/image'
import Chicken from "../../../assets/broiler.png"
// import { useSelector } from 'react-redux'
// import { Initials } from '../Componemts/redux'
// import { TiTick } from "react-icons/ti";
// import { ImCross } from "react-icons/im";

const page = () => {
    
//   const isLogin = useSelector((state: { user: Initials }) => state.user.sigUpMode);
    return (
        <div>

            <div className='flex flex-col lg:flex-row border-2 lg:px-30'>
                <div className='lg:w-[40%] lg:h-[500px] border-2 bg-gray-200'>

                    <Image src={Chicken} alt='' className='object-cover h-full w-full p-4' />

                </div>

                <div className='lg:w-[50%] border-2 p-6'>
                    <h1 className='font-bold text-2xl lg:text-4xl'>Desi Tagdi Brolier of 4 Kg Each</h1>

                    <div className='flex flex-row gap-2 items-end'>
                        <div className='text-sm mt-4'>
                            <p>Price</p>
                            <p>Per Unit</p>
                        </div>
                        <strong className='text-3xl'>Rs. 200</strong>

                    </div>


                    <div className='mt-20 space-y-4'>
                        <h1 className='font-extrabold text-2xl'>Description</h1>
                        <p>As a poultry farmer in rural India, I raise healthy broiler chickens in a clean, well-managed environment. My focus is on providing high-quality, protein-rich meat for consumers. The broilers are fed a balanced diet and monitored closely to ensure proper growth and hygiene. I follow responsible farming practices and avoid harmful chemicals to keep the meat safe and fresh. These birds are ready for market in just 5–6 weeks, making broiler farming both efficient and sustainable. My goal is to supply nutritious, tender chicken that supports local food needs and offers a reliable income source for my family and village.
                        </p>

                    </div>

                    <div>
                        {/* <p className='flex flex-row text-xl gap-2 items-center font-semibold'>Exportable {isLogin ? <TiTick size={20} fill='green' className='mt-2' /> : <ImCross size={20}  fill='red' className='mt-2'/>}</p> */}
                        <p>Verfied Seller</p>
                    </div>

                </div>
            </div>

            <div>
                <h1>Others from Selelrs</h1>
                 <h1>Similar Products</h1>
                 <h1>Review and Ratings</h1>
            </div>
        </div>
    )
}

export default page
