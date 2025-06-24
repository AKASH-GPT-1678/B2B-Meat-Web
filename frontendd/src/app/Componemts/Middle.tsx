import React from 'react'
import Lbiryani from "../../../assets/biryani3.png"
import Image from 'next/image'
import { PopBar } from './PopBar'
export const Middle = () => {
    return (
        <div className="w-full h-[500px] bg-cover bg-center relative">
            <Image
                src={Lbiryani}
                alt="Biryani"
                className="w-full h-full object-cover absolute top-0 left-0 z-0"
            />
             <div className="absolute right-20 top-[-20]">
                  <PopBar />
                </div>
               
            <div className="relative z-10 text-white p-4">
                {/* Optional overlay content */}
                <h1 className="text-3xl font-bold">Delicious Biryani</h1>
            </div>
        </div>
    )
}
