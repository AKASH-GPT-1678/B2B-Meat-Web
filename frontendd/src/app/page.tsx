"use client";
import { Middle } from "./Componemts/Middle";
import { Header } from "./Componemts/Header";
import { Categories } from "./Componemts/Categories";
import { DisplayProducts } from "./Componemts/Mydisplay";
import { useSelector } from "react-redux";
import { Initials } from "./Componemts/redux";
import { SignUp } from "./Componemts/SignUp";


export default function Home() {
  
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

  {/* SignUp Modal */}
  {isLogin ? <SignUp /> : null}

  {/* Display Product Sections */}
  <DisplayProducts category="Trending Now" />
  <DisplayProducts category="New Arrivals" />
  <DisplayProducts category="Best Sellers" />
  <DisplayProducts category="Bulk Deals & Offers" />
  <DisplayProducts category="Farmers & Sellers Spotlight" />

</div>



  );
}
