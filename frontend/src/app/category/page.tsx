'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DisplayProd, Product } from '../appcomponents/DisplayProd';
import apiClient from '@/lib/axios';
const page = () => {

  const searchParams = useSearchParams();
  const category = searchParams.get('type');

  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await apiClient.get(
          `/product/getProduct?type=${category?.toUpperCase()}`
        );
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (category) {
      getProducts();
    }
  }, [category]); 

  return (
    <div className='relative'>


      <div className='p-4 flex flex-row gap-10 flex-wrap'>
        {products.map((item, index) => (
          <div key={index}>
            <DisplayProd {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
