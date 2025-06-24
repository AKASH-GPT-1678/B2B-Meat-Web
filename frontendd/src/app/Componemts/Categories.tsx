import React from 'react'
import Image from 'next/image'
import {Foods} from "../../../assets/categories/asset"
export const Categories = () => {
  return (
    <div>
        <div className='flex flex-row gap-5 '>
           {Foods.map((item , index) => (
            <div key={index} className='w-[200px] h-[200px] bg-amber-50 flex flex-col gap-2 justify-center items-center cursor-pointer shadow-2xl rounded-xl'>

              <Image src={item.image} alt={item.name}  className='size-30 rounded-full'/>

              <strong>{item.name}</strong>

            </div>
           ))}
        </div>
    </div>
  )
}
