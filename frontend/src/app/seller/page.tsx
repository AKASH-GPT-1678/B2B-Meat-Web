"use client";
import React from 'react'
import Image from 'next/image'
import Farms from "../../../assets/farms.jpg"
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';

const Seller = () => {
  const router = useRouter();

  return (
    <div className="relative">
      {/* Background Image */}
      <div className="w-full h-[500px] relative overflow-hidden">
        <Image
          src={Farms}
          alt="Farm Background"
          className="w-full h-full object-cover absolute top-0 left-0 z-0"
        />

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Animated Text Container */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-20 space-y-3">
          
          {/* Title 1 */}
          <motion.h1
            className="text-5xl font-semibold"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Wanted to Get Started
          </motion.h1>

          {/* Title 2 */}
          <motion.h1
            className="text-4xl"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            as Seller
          </motion.h1>

          {/* Title 3 */}
          <motion.h1
            className="text-4xl"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            on Platform
          </motion.h1>
        </div>
      </div>

      {/* Button Section */}
      <div className="flex justify-center mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 text-white font-semibold px-10 py-4 rounded-md shadow-md cursor-pointer"
          onClick={() => router.push("/sellerform")}
        >
          Become a Seller
        </motion.button>
      </div>
    </div>
  );
};

export default Seller;
