import React from 'react'
import Image from 'next/image'
import Broiler from "../../../assets/broiler.png"
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

import { useSearchParams } from 'next/navigation';
interface Product {
  category: string;
}
export const DisplayProducts: React.FC<Product> = ({ category}) => {
  const searchParams = useSearchParams();

  const liveStockId = searchParams.get('livestock');

  return (
    <div>
      <div className='p-6'>
        <h2 className='text-2xl font-bold'>{category}</h2>

        <div className='flex flex-row gap-5 overflow-auto lg:grid lg:grid-cols-3 xl:grid-cols-5'>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index}>
              <div className='flex flex-col w-[200px] lg:w-[300px]  rounded-b-2xl shadow-2xl'>
                <Image src={Broiler} alt={""} className='w-[200px] lg:w-[300px] h-[200px] rounded-t-xl' />

                <div className='border-1 p-2 rounded-b-2xl'>

                  <p className='text-xl'>Desi Broiler Top Quality  Being baked from more than 100 days</p>

                  <p className='mt-8 text-sm hidden lg:inline'>
                    As a poultry farmer in rural India, I raise healthy broiler chickens in a clean, well-managed environment.
                    diet...










                  </p>

                  <p>700 + People Orderd in last 10 days</p>
                  <p className='blur-sm'>Rajwanti Sellers Mumbai</p>
                  <p className='blur-sm'>Contact</p>

                  <p>Coupon Code</p>

                  <div className='flex flex-row space-x-3'>
                    <p>Exportable</p>

                    <TiTick size={30
                    } fill='green' />

                    <ImCross size={18
                    } fill='red' />


                  </div>
                  <strong className='text-2xl'>Rs. 500</strong>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  )
}
