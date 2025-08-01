import React from 'react'
import { SlLocationPin } from "react-icons/sl";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { signUpMode } from './redux';
import { PopBar } from './PopBar';
import { useAppDispatch, useAppSelector } from '@/utils/reduxhook';
import Image from 'next/image';
import Lbiryani from "../../../assets/biryani3.png"
import CheckoutButton from './CheckourButton';
export const Header = () => {
    const dispatch = useAppDispatch();
    const isVerified = useAppSelector((state) => state.data.isLoggedIn);
    const [showPopBar, setShowPopBar] = React.useState(false);

    const popbarRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popbarRef.current && !popbarRef.current.contains(event.target as Node)) {
                setShowPopBar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);




    return (

        <div className='flex flex-col w-full relative'>
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


                    <FaRegUserCircle className='size-8  lg:size-10 cursor-pointer' onClick={() => setShowPopBar(!showPopBar)} />
                    <CheckoutButton />







                </div>



            </div>
            <div className="w-full h-[500px] bg-cover bg-center relative">



                <div className='w-full h-full '>
                    <Image
                        src={Lbiryani}
                        alt="Biryani"
                        className="w-full h-full object-cover "
                    />

                    {

                        showPopBar && (
                            <div className='float-right ml-auto absolute top-0 right-12 z-40 ' id='popbar' ref={popbarRef}>
                                <PopBar />
                            </div>

                        )
                    }


                </div>

                <div className="relative z-10 text-white p-4">
                    {/* Optional overlay content */}
                    <h1 className="text-3xl font-bold">Delicious Biryani</h1>
                </div>
            </div>



        </div>



    )
}
