"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { DisplayProd } from '../Componemts/DisplayProd';

const Category = () => {
    const searchParams = useSearchParams();
    const category = searchParams.get('type');




    return (
        <div>
            <h1>Namsata</h1>
            <h1>{category}</h1>

            <div className='p-4 flex flex-row gap-10 flex-wrap'>
                <DisplayProd />
                <DisplayProd />
                <DisplayProd />
                <DisplayProd />

            </div>



        </div>
    )
}

export default Category
