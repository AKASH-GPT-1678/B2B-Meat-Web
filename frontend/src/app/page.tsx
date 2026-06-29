"use client";
import axios from "axios";
import { Header } from "./appcomponents/Header";
import { Categories } from "./appcomponents/Categories";
import {
  setToken,
  setUserEmail,
  setUserId,
} from "./appcomponents/redux-persit";
import { useAppSelector, useAppDispatch } from "@/utils/reduxhook";
import { useSession } from "next-auth/react";
import { setisLoggedIn, setUserSeller } from "./appcomponents/redux-persit";
import React from "react";
import { DisplayProd, Product } from "./appcomponents/DisplayProd";
import Footer from "./appcomponents/Footer";
import Image from "next/image";
import WhatsAppIcon from "../../public/whatsapp.svg";
import Link from "next/link";
export default function Home() {
  const data = useSession();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.data.token);
  // const isPremium = useAppSelector((state) => state.data.isPremium);
  // const isVerified = useAppSelector((state) => state.data.isLoggedIn);
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
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.status);
        console.log(response.data);
        if (response.status == 200) {
          dispatch(setToken(token));
          dispatch(setisLoggedIn(true));
          dispatch(setUserId(response.data.id));

          dispatch(setUserSeller(response.data.isSeller));
          dispatch(setUserEmail(response.data.email));
        } else if (response.status == 403) {
          dispatch(setisLoggedIn(false));
          throw new Error("Invalid token");
        }
      } catch (error: any) {
        console.error(error);
        if (error.response.status == 403) {
          dispatch(setisLoggedIn(false));
        }
      }
    }

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
        setError("Failed to fetch products");
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="relative">
<div className="fixed bottom-6 right-6 z-50 group">
  <Link
    href="https://wa.me/917208563916"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3"
  >

    <span className="hidden md:block bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
      Chat with us
    </span>

    <div className="relative">
     
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30"></span>

      <div className="relative bg-white rounded-full p-3 shadow-2xl hover:scale-110 transition-transform duration-300 border border-green-200">
        <Image
          src={WhatsAppIcon}
          alt="WhatsApp"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
    </div>
  </Link>
</div>

      <div>
        <Header />
      </div>

      <div>
        <div className="flex justify-center mt-10">
          <Categories />
        </div>
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-4 lg:gap-8 mt-10">
        {products &&
          products.map((product, index) => (
            <div key={index}>
              <DisplayProd {...product} />
            </div>
          ))}
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
