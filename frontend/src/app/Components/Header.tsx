"use client";
import React from 'react'
import { SlLocationPin } from "react-icons/sl";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { PopBar } from './PopBar';
import { useAppDispatch, useAppSelector } from '@/utils/reduxhook';
import Image from 'next/image';
import Lbiryani from "../../../assets/biryani3.png"
import CheckoutButton from './CheckourButton';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
export const Header = () => {
    const dispatch = useAppDispatch();
    const isVerified = useAppSelector((state) => state.data.isLoggedIn);
    const [showPopBar, setShowPopBar] = React.useState(false);
    const [search , setSearch] = React.useState("");
    const router = useRouter();

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
    const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;

    const handleSearch = async () => {
        if(search !== ""){
            const response = await axios.get(`${endpoint}/product/search?search=${search}`);

       
        }
    }




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


                <div className='hidden  lg:flex flex-row gap-5 items-center     '>
                    <input type='text' placeholder='Search for 1000+ products' className='bg-gray-100  h-fit p-3 px-16 justify-center items-center' onChange={(e) => setSearch(e.target.value)}></input>
                     <IoSearch className='size-8  lg:size-10  cursor-pointer ' />


                </div>
                <div className='flex flex-row gap-5 relative'>
                    <IoSearch className='size-8  lg:size-10 lg:hidden cursor-pointer' />
                    <FaShoppingCart className='size-8  lg:size-10 cursor-pointer' />


                    {
                        isVerified ? <FaRegUserCircle className='size-8  lg:size-10 cursor-pointer' onClick={() => setShowPopBar(!showPopBar)} /> :
                            <Button className='px-8 py-6 cursor-pointer hover:scale-105' onClick={() => router.push("/login")}>Login</Button>
                    }



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
