"use client";
import React from 'react'
import Image from 'next/image'
import Farms from "../../../assets/farms.jpg"
import { motion } from "framer-motion";
import { Sellerform } from '../Componemts/Sellerform';

const Seller = () => {
    const [showSellerForm, setShowSellerForm] = React.useState(false);

    const formRef = React.useRef<HTMLDivElement>(null);
    

    React.useEffect(() => {
        if (showSellerForm) {
            const handleClickOutside = (e : any) => {
                if (formRef.current && !formRef.current.contains(e.target)) {
                    setShowSellerForm(false);
                }
            };

            document.addEventListener('click', handleClickOutside);

            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [showSellerForm]);

    // const url = "https://media.istockphoto.com/id/1363571533/photo/open-soybean-field-at-sunset.jpg?s=612x612&w=0&k=20&c=TEw_oBj-8R8Ycd-bpHnUNMtQwvxt1vK5CYcpP1hMiTU=";
    return (

        <div className='relative'>

            <div className="w-full h-[500px] bg-cover bg-center relative">
                <Image
                    src={Farms}
                    alt="Biryani"
                    className="w-full h-full object-cover absolute top-0 left-0 z-0 "
                />
                {/* Title sliding in from left */}
                <motion.div
                    className="absolute top-[40%] left-[50%]"
                    initial={{ left: "-50%" }}
                    animate={{ left: "35%" }}
                    transition={{ duration: 3 }}
                >
                    <h1 className="text-white text-5xl">Wanted to Get Started</h1>
                </motion.div>

                {/* Second text sliding in from left (use `left`, not mix `right`) */}
                <motion.div
                    className="absolute top-[50%] right-[50%] text-3xl"
                    initial={{ right: "-50%" }}
                    animate={{ right: "50%" }}
                    transition={{ duration: 3 }}
                >
                    <h1 className="text-white text-4xl">as Seller</h1>
                </motion.div>

                {/* Third text sliding in from left */}
                <motion.div
                    className="absolute top-[60%] left-[50%] text-4xl"
                    initial={{ left: "-50%", color: "red" }}
                    animate={{ left: "40%", color: "pink" }}
                    transition={{ duration: 3 }}
                >
                    <h1 className="text-white text-4xl">on Platform</h1>
                </motion.div>


            </div>

            <div className='flex flex-row justify-center items-center mt-5'>
                <button className=' text-white p-5 px-12 rounded-sm bg-green-600 cursor-pointer'>

                    <strong onClick={() => setShowSellerForm(true)}>      Become a Seller</strong>
                </button>




            </div>
            {
                showSellerForm &&
                <div className='absolute top-[40%] left-[36%]' ref={formRef}>


                    <Sellerform />
                </div>
            }

        </div>
    )
}

export default Seller
