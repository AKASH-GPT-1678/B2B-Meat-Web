"use client";
import { Middle } from "./Components/Middle";
import axios, { Axios } from "axios";
import { Header } from "./Components/Header";
import { Categories } from "./Components/Categories";
import { setGoogleVerified, setToken, setPremium } from "./Components/redux-persit";
import { useAppSelector, useAppDispatch } from "@/utils/reduxhook";
import { useSession } from "next-auth/react";
import { setisLoggedIn } from "./Components/redux-persit";
import React from "react";
import { fa } from "zod/v4/locales";
export default function Home() {
  const data = useSession();


  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.data.token);
  const isPremium = useAppSelector((state) => state.data.isPremium);
  const isVerified = useAppSelector((state) => state.data.isLoggedIn);




  React.useEffect(() => {
    async function checkToken(token: string) {
      try {
        const response = await axios.get('http://localhost:8080/auth/checkToken', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.status);
        if (response.status == 200) {
          dispatch(setToken(token));
          dispatch(setisLoggedIn(true));
        }


        return response.status;

      } catch (error: any) {
        console.error(error);
        if (error.response.status == 403) {
          setisLoggedIn(false);

        }

      }

    };
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




    </div>



  );
}
