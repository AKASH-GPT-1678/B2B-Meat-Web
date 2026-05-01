'use client';
import apiClient from '@/lib/axios';
import { useAppSelector } from '@/utils/reduxhook';
import { useParams } from 'next/navigation';
import React from 'react';
export default function SellerProfile() {
  const params = useParams();
  const token = useAppSelector((state) => state.data.token);
  const [seller , setSeller] = React.useState<any>();

  if(!params.slug) return <div>Loading...</div>;

  const loadSeller = async () => {
    try {
        const response = await apiClient.get(`/seller/details/${params.slug}` , {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        console.log(response.data);
        setSeller(response.data);


        
    } catch (error) {
        console.error(error);

        
    }
  }

  React.useEffect(() => {
    loadSeller();
  }, []);

  return <div>

    {JSON.stringify(seller)}
  </div>;
}