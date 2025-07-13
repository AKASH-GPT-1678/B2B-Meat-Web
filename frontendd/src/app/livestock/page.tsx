"use client";
import React from 'react'
import Image from 'next/image'
import Chicken from "../../../assets/broiler.png"
// import { useSelector } from 'react-redux'
// import { Initials } from '../Componemts/redux'
// import { TiTick } from "react-icons/ti";
// import { ImCross } from "react-icons/im";
import { TiTick } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';
import { useRouter } from 'next/navigation';
const page = () => {
  const router = useRouter()

  function managePush() {
    router.push('/chat')
  }

  return (
    <div className='border-2'>
      <div className=' p-10 xl:p-40 grid md:grid-cols-2 bg-gray-100 border-2'>

        <div className='flex flex-col gap-8

                


                '>

          <div>
            <Image src={Chicken} alt='product' className='rounded-2xl w-full sm:w-[400px] p-6 min-h-[300px] xl:w-[500px] xl:h-[500px]' />

          </div>
          <div className='flex flex-row gap-4 w-full sm:w-[400px] xl:w-[500px]  p-6'>
            <div className='flex-1 min-h-[100px] relative rounded-lg overflow-hidden'>
              <Image
                src={Chicken}
                alt="Chicken 1"
                fill
                className="object-cover"
              />
            </div>
            <div className='flex-1 min-h-[100px] relative rounded-lg overflow-hidden'>
              <Image
                src={Chicken}
                alt="Chicken 2"
                fill
                className="object-cover"
              />
            </div>
            <div className='flex-1 min-h-[100px] relative rounded-lg overflow-hidden'>
              <Image
                src={Chicken}
                alt="Chicken 3"
                fill
                className="object-cover"
              />
            </div>
            <div className='flex-1 min-h-[100px] relative rounded-lg overflow-hidden'>
              <Image
                src={Chicken}
                alt="Chicken 4"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
        <div className='flex flex-col justify-center max-w-[600px] '>
          <h2>Shahbaz Farms</h2>
          <h1 className='font-bold text-4xl'>Limited Edition Seasonal Broiler</h1>

          <span className='mt-10'>
            Our farm-fresh broiler chicken is raised in a clean and healthy environment, ensuring tender, juicy meat with every cut. Naturally fed and free from harmful antibiotics, our chicken offers both great taste and quality. From our farm to your kitchen, we guarantee freshness you can trust.


          </span>
          <p className='font-bold text-4xl mt-5'>
            Rs 2000

          </p>

          <div className='flex flex-row gap-4 mt-10 items-center'>
            <p>Exportable</p>

            <TiTick size={30
            } fill='green' />

            <ImCross size={18
            } fill='red' />


          </div>
 <div className='grid grid-cols-2'>


          <div className='flex flex-row items-center justify-center   bg-gray-200 max-w-[200px]  py-3 rounded-2xl mt-10 '>
            <button className='flex-1/4 font-bold text-3xl cursor-pointer'>
              -
            </button>
            <button className='flex-2/4 font-bold cursor-pointer text-xl'>100</button>
            <button className='flex-1/4 font-bold cursor-pointer'>
              +
            </button>

          </div>
          
          <div className='flex flex-row items-center justify-center   bg-orange-400 max-w-[200px]  py-3 rounded-2xl mt-10 '>
          <span className='font-bold text-lg' onClick={managePush}>Contact Seller</span>
       

          </div>
 
            
 </div>

        </div>



      </div>

    </div>
  )
}

export default page
