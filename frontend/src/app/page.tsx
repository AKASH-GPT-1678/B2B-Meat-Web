"use client";
import axios, { Axios } from "axios";
import { Header } from "./appcomponents/Header";
import { Categories } from "./appcomponents/Categories";
import { setGoogleVerified, setToken, setPremium, setUserEmail, setUserId } from "./appcomponents/redux-persit";
import { useAppSelector, useAppDispatch } from "@/utils/reduxhook";
import { useSession } from "next-auth/react";
import { setisLoggedIn, setUserSeller } from "./appcomponents/redux-persit";
import React from "react";
import ToogleCheck from "./appcomponents/checked";
import { DisplayProd, Product } from "./appcomponents/DisplayProd";
import Footer from "./appcomponents/Footer";
import { fa } from "zod/v4/locales";
export default function Home() {
  const data = useSession();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [error, setError] = React.useState<string | null>(null);


  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.data.token);
  const isPremium = useAppSelector((state) => state.data.isPremium);
  const isVerified = useAppSelector((state) => state.data.isLoggedIn);
  const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;




  React.useEffect(() => {
    async function checkToken(token: string) {
      if (!token) {
        return;
      }

      console.log(token);
      try {
        const response = await axios.get(`${endpoint}/auth/checkToken`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.status);
        console.log(response.data);
        if (response.status == 200) {
          dispatch(setToken(token));
          dispatch(setisLoggedIn(true));
          dispatch(setUserId(response.data.id));

          dispatch(setUserSeller(response.data.isSeller));
          dispatch(setUserEmail(response.data.email));
        }
        else if (response.status == 403) {
          dispatch(setisLoggedIn(false));
          throw new Error('Invalid token');
        }




      } catch (error: any) {
        console.error(error);
        if (error.response.status == 403) {

          dispatch(setisLoggedIn(false));


        }

      }

    };

    checkToken(token?.toString() || "");

  }, []);

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${endpoint}/product/getProducts`);
        setProducts(response.data);
        console.log("Hey there");
        console.log(response.data);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch products');
      }
    }

    fetchProducts();
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
  



      <div className="flex flex-row flex-wrap justify-center gap-4 lg:gap-8 mt-10">
        {
          products && products.map((product, index) => (
            <div key={index} >
              <DisplayProd {...product} />
            </div>

          ))
        }
      </div>
      <div className="mt-10">

        <Footer />
      </div>




    </div>



  );
}
