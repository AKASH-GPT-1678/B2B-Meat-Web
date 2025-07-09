"use client";
import React from 'react'
import Broiler from "../../../assets/broiler.png"
import Image from 'next/image'
export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    productImgUrl: string;
    minimumOrderQuantity: string;
    exportable: boolean;
    createdOn: string;     // ISO 8601 date-time format
    updatedOn: string | null;
}

export const DisplayProd : React.FC<Product> = ({productImgUrl , price , minimumOrderQuantity , name , description , exportable}) => {
    return (

        <div className='flex flex-row sm:flex-col rounded-b-2xl  sm:w-[300px]  shadow-2xl w-full  h-fit'>
            <div className='flex flex-col h-[160px] w-[160px] sm:h-[250px] sm:w-fit md:h-[300px] md:w-[300px]'>
                <Image src={productImgUrl} width={100} height={100} alt='' className='object-cover h-full w-full sm:rounded-t-4xl' />




            </div>
            <div className='p-2'>
                <h1 className='font-bold text-xl sm:text-2xl'> {name}</h1>
                <p>&#8377; {price} per unit</p>
                <p>Bulk Offer </p>
                <p>Ordered 100 on last month</p>
                <p className='blur' onCopy={() => alert("Copied to clipboard")}>XYZPGK</p>
                <p className='max-w-[300px] hidden sm:inline'>{description.substring(0, 100)} more..</p>


            </div>

            <div className='flex flex-col sm:flex-row gap-2 justify-between p-2 pb-8 '>
                <button className='p-2 sm:rounded-xl cursor-pointer px-6 sm:px-10 bg-orange-300'> Add </button>
                <button className='p-2 sm:rounded-xl cursor-pointer px-6 sm:px-10 bg-orange-300'> Contact </button>
            </div>


        </div>

    )
}
