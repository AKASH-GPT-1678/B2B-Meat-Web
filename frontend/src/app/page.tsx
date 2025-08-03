"use client";
import { Middle } from "./Components/Middle";
import axios, { Axios } from "axios";
import { Header } from "./Components/Header";
import { Categories } from "./Components/Categories";
import { setGoogleVerified, setToken, setPremium } from "./Components/redux-persit";
import { useAppSelector, useAppDispatch } from "@/utils/reduxhook";
import { useSession } from "next-auth/react";
import { setisLoggedIn, setUserSeller } from "./Components/redux-persit";
import React from "react";
import { fa } from "zod/v4/locales";
import { DisplayProd, Product } from "./Components/DisplayProd";
export default function Home() {
  const data = useSession();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [error, setError] = React.useState<string | null>(null);


  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.data.token);
  const isPremium = useAppSelector((state) => state.data.isPremium);
  const isVerified = useAppSelector((state) => state.data.isLoggedIn);




  React.useEffect(() => {
    async function checkToken(token: string) {
      if (!token) {
        return;
      }
      try {
        const response = await axios.get('http://localhost:8080/auth/checkToken', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.status);
        console.log(response.data);
        if (response.status == 200) {
          dispatch(setToken(token));
          dispatch(setisLoggedIn(true));

          dispatch(setUserSeller(response.data.isSeller));
        }


        return response.status;

      } catch (error: any) {
        console.error(error);
        if (error.response.status == 403) {

          dispatch(setisLoggedIn(false));


        }

      }

    };
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8080/product/getProducts', {});
        setProducts(response.data);
        console.log(response.data);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch products');
      }
    }

    fetchProducts();
    checkToken(token?.toString() || "");

  }, []);


  return (
    <div className="relative">






      <div>
        <Header />

      </div>





      <div >

        <div className="flex justify-center mt-10">
          <Categories />
        </div>
      </div>

      {/* Premium Access Notice */}
      <div className="flex flex-col justify-center items-center my-4 text-center space-y-1">
        <p className="font-semibold">Only Premium Buyers can contact and view Sellers</p>


        {isPremium ? <p className="font-semibold">You are a Premium Buyer</p> : <p className="text-blue-600 underline cursor-pointer">Get Premium</p>}
        <h1>{isPremium}</h1>

        <button onClick={() => dispatch(setGoogleVerified("Namaskar"))}></button>
        {/* <h1>{isLogin1}</h1>
            <p>{isLogin1}</p> */}
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-4">
        {
          products.map((product, index) => (
            <div key={index} >
              <DisplayProd {...product} />
            </div>

          ))
        }
      </div>




    </div>



  );
}
