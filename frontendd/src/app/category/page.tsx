"use client";
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { DisplayProd } from '../Componemts/DisplayProd';
import { NotPremiumUser } from '../Componemts/PremiumPopup';
import { Product } from '../Componemts/DisplayProd';
import axios from 'axios';
import { set } from 'zod/v4-mini';
const Category = () => {
    const searchParams = useSearchParams();
    const category = searchParams.get('type');
    const [products, setProducts] = React.useState<Product[]>([]);

    async function getProducts() {
        try {
            const response = await axios.get('http://localhost:8080/product/getproduct?type=' + category);
            console.log(response.data);
            setProducts(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch products');  // ✅ React Query will handle this error
        }
    }

    useEffect(() => {
        getProducts();
    }, []);


    return (
        <div className='relative'>
            <h1>Namsata</h1>
            <h1>{category}</h1>

            <div className='p-4 flex flex-row gap-10 flex-wrap'>
                {
                    products.map((item, index) => (
                        <div key={index}>
                            <DisplayProd
                                {...item}
                            />
                        </div>
                    ))
                }



            </div>
            {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <NotPremiumUser />
            </div> */}



        </div>
    )
}

export default Category
