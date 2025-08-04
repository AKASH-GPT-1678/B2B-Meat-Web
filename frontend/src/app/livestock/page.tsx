"use client";
import React from 'react'
import Image from 'next/image'
import Chicken from "../../../assets/broiler.png"

import { TiTick } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { fa } from 'zod/v4/locales';
export interface ProductResponseDTO {
  id: string; // UUID
  name: string;
  description: string;
  minimumOrderQuantity: string;
  price: number;
  productImgUrl: string;
  exportable: boolean;
  category: string;
  createdOn: string; // ISO timestamp
  updatedOn: string | null;
}

const page = () => {
  const searchParams = useSearchParams();
  const [product, setProduct] = React.useState<ProductResponseDTO>();
  const [error, setError] = React.useState(false);
  const [minimumOrderQuantity, setMinimumOrderQuantity] = React.useState<number>(0);


  const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();

  const livestockId = searchParams.get('livestock');
  React.useEffect(() => {
    if (!livestockId) return;

    const fetchProduct = async (): Promise<ProductResponseDTO | undefined> => {
      try {

        const response = await axios.get(`${endpoint}/product/livestock`, {
          params: { id: livestockId }
        });
        setProduct(response.data);
        console.log(response.data);
        setError(false);
        setMinimumOrderQuantity(Number(response.data.minimumOrderQuantity));

        return undefined;

      } catch (err) {
        setError(true);
      } finally {

      }
    };

    fetchProduct();
  }, [livestockId]);


  return (
    <div className=''>

      {

        !error && product &&
        <div className=' p-10 xl:p-40 grid md:grid-cols-2 bg-gray-100 '>

          <div className='flex flex-col gap-8

                
                '>

            <div>
              <Image src={product.productImgUrl} width={400} height={400} alt='product' className='rounded-2xl w-full sm:w-[400px] p-6 min-h-[300px] xl:w-[500px] xl:h-[500px]' />

            </div>
            <div className='flex flex-row gap-4 w-full sm:w-[400px] xl:w-[500px]  p-6'>
              <div className='flex-1 min-h-[100px] relative rounded-lg overflow-hidden'>
                <Image
                  src={product.productImgUrl}
                  alt="Chicken 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className='flex-1 min-h-[100px] relative rounded-lg overflow-hidden'>
                <Image
                  src={product.productImgUrl}
                  alt="Chicken 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className='flex-1 min-h-[100px] relative rounded-lg overflow-hidden'>
                <Image
                  src={product.productImgUrl}
                  alt="Chicken 3"
                  fill
                  className="object-cover"
                />
              </div>
              <div className='flex-1 min-h-[100px] relative rounded-lg overflow-hidden'>
                <Image
                  src={product.productImgUrl}
                  alt="Chicken 4"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
          <div className='flex flex-col justify-center max-w-[600px] '>
            <h2>{product.name}</h2>
            <h1 className='font-bold text-4xl'>{product.name}</h1>

            <span className='mt-10'>
              {
                product.description
              }
            </span>
            <p className='font-bold text-4xl mt-5'>
              {product.price}

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
                <button className='flex-1/4 font-bold text-3xl cursor-pointer' onClick={()=> setMinimumOrderQuantity(minimumOrderQuantity - 1)}>
                  -
                </button>
                <button className='flex-2/4 font-bold cursor-pointer text-xl'>{minimumOrderQuantity}</button>
                <button className='flex-1/4 font-bold cursor-pointer' onClick={() => setMinimumOrderQuantity(minimumOrderQuantity + 1)}>
                  +
                </button>

              </div>

              <div className='flex flex-row items-center justify-center   bg-orange-400 max-w-[200px]  py-3 rounded-2xl mt-10 '>
                <span className='font-bold text-lg cursor-pointer' onClick={()=> router.push("/chat") } >Contact Seller</span>


              </div>


            </div>

          </div>



        </div>
      }


    </div>
  )
}

export default page
