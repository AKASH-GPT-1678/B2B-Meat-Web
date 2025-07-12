"use client";
import { Middle } from "./Componemts/Middle";
import { Header } from "./Componemts/Header";
import { Categories } from "./Componemts/Categories";
import { setGoogleVerified } from "./Componemts/redux-persit";
import { useAppSelector , useAppDispatch} from "@/utils/reduxhook";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./Componemts/redux-persit";
export default function Home() {
  const data = useSession();
  

  const dispatch = useAppDispatch();
  const isLogin1 = useAppSelector((state) => state.data.token);


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
        <p className="text-blue-600 underline cursor-pointer">Get Premium</p>
        <button onClick={()=>dispatch(setToken("Bhosdi wala"))}>Login Maar</button>
        <button onClick={() => dispatch(setGoogleVerified("Namaskar"))}></button>
        {/* <h1>{isLogin1}</h1>
            <p>{isLogin1}</p> */}
      </div>




    </div>



  );
}
