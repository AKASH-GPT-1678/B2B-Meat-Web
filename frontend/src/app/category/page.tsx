'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DisplayProd, Product } from '../Components/DisplayProd';
import axios from 'axios';

const page = () => {
  // ✅ All hooks declared at top level
  const searchParams = useSearchParams();
  const category = searchParams.get('type');

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/product/getproduct?type=${category}`
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
  }, [category]); // ✅ react to changes in search params

  return (
    <div className='relative'>
      <h1>Namaste</h1>
      <h1>{category}</h1>

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
