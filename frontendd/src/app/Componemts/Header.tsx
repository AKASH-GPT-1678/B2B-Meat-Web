import React from 'react'
import { SlLocationPin } from "react-icons/sl";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useDispatch  } from 'react-redux';
import {  signUpMode } from './redux';

export const Header = () => {
    const dispatch = useDispatch();

    return (


        <div className="px-4 flex flex-row justify-between items-center py-6 xl:px-36 ">
            <div>
                <h1 className="text-3xl font-handwriting font-extrabold ">Meat Truck</h1>
            </div>



            <div className="flex flex-row gap-2 bg-gray-100 hover:bg-gray-200  rounded-xl h-fit p-2 cursor-pointer justify-center items-center">

                <SlLocationPin className='mt-2' size={24} />
                <p className='text-sm'>Deliver to:</p>
                <p className='font-bold hidden md:inline'> Karol baug New Delhi</p>






            </div>


            <div className='hidden lg:inline'>
                <input type='text' placeholder='Search for 1000+ products' className='bg-gray-100  h-fit p-3 px-16 justify-center items-center'></input>
            </div>
            <div className='flex flex-row gap-5 relative'>
                <IoSearch className='size-8  lg:size-10 lg:hidden cursor-pointer' />
                <FaShoppingCart className='size-8  lg:size-10 cursor-pointer' />


                <FaRegUserCircle className='size-8  lg:size-10 cursor-pointer' onClick={()=>dispatch(signUpMode())} />

                  

               

            </div>

        </div>



    )
}
