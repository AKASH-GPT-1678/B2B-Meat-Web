"use client";
import { Middle } from "./Componemts/Middle";
import { Header } from "./Componemts/Header";
import { Categories } from "./Componemts/Categories";
import { DisplayProducts } from "./Componemts/Mydisplay";
import { useSelector } from "react-redux";
import { Initials } from "./Componemts/redux";
import { SignUp } from "./Componemts/SignUp";
import { signIn } from "next-auth/react";
import { DisplayProd } from "./Componemts/DisplayProd";
import CheckoutButton from "./Componemts/CheckourButton";
import { useSession } from "next-auth/react";
export default function Home() {
  const data = useSession();

  const isLogin = useSelector((state: { user: Initials }) => state.user.sigUpMode);

  return (
    <div className="relative">


      <Header />





      <div >

        <Middle />

        {/* Categories Centered */}
        <div className="flex justify-center">
          <Categories />
        </div>
      </div>

      {/* Premium Access Notice */}
      <div className="flex flex-col justify-center items-center my-4 text-center space-y-1">
        <p className="font-semibold">Only Premium Buyers can contact and view Sellers</p>
        <p className="text-blue-600 underline cursor-pointer">Get Premium</p>
      </div>

      <CheckoutButton />


    </div>



  );
}
