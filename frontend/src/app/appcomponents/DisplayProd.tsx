"use client";
import React from 'react'
import Image from 'next/image'
import { useAppSelector } from '@/utils/reduxhook';
import { useRouter } from 'next/navigation';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;           // normalized from "category" / "category : "BUFFALO""
  price: number;              // numeric price
  productImgUrl: string;
  sellerId?: string | null;
  sellerName?: string | null;
  minimumOrderQuantity: number; // numeric MOQ
  exportable: boolean;
  createdOn: Date;
  updatedOn: Date | null;
  exportableRaw?: boolean;    // raw boolean (keeps raw if needed)
  raw?: unknown;              // keep original if needed for debugging
}




export const DisplayProd: React.FC<Product> = ({ productImgUrl, id,price, minimumOrderQuantity, name, description, exportable , sellerId  , sellerName}) => {
    const router = useRouter();



    const handlePush = (name: string) => {
        router.push('/livestock')

    };
 
    const isPremium = useAppSelector((state) => state.data.isPremium);
    return (

        <div className='flex flex-row sm:flex-col rounded-b-2xl  sm:w-[300px] cursor-pointer shadow-2xl w-full  h-fit' onClick={()=> router.push(`/livestock?livestock=${id}`)}  >
            <div className='flex flex-col h-[160px] w-[160px] sm:h-[250px] sm:w-fit md:h-[300px] md:w-[300px]' >
                <Image src={productImgUrl} width={200} height={200} alt='' className='object-cover h-full w-full sm:rounded-t-4xl' />




            </div>
            <div className='p-2'>
                <h1 className='font-bold text-xl sm:text-2xl'> {name}</h1>
                <p>&#8377; {price} per unit</p>
                <p>Bulk Offer </p>
                <p>Ordered 100 on last month</p>
                <p className={`${isPremium ? 'inline' : 'blur'}`} onCopy={() => alert("Copied to clipboard")}>XYZPGK</p>
                <p className='max-w-[300px] hidden sm:inline'>{description.substring(0, 80)} more..</p>


            </div>

            <div className='flex flex-col sm:flex-row gap-2 justify-end p-2 pb-8 '>
                {/* <button className='p-2 sm:rounded-xl cursor-pointer px-6 sm:px-10 bg-orange-300'> Add </button> */}
                <button className='p-3 sm:rounded-xl cursor-pointer px-6 sm:px-10 bg-orange-300'> Contact </button>
            </div>


        </div>

    )
}
