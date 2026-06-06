"use client";
import React from "react";
import { SlLocationPin } from "react-icons/sl";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { PopBar } from "./PopBar";
import { useAppSelector } from "@/utils/reduxhook";
import Image from "next/image";
import Lbiryani from "../../../assets/biryani3.png";
import CheckoutButton from "./CheckourButton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getLocationName } from "@/lib/getlocation";
import { TbXboxXFilled } from "react-icons/tb";
import { FaLocationCrosshairs } from "react-icons/fa6";
import apiClient from "@/lib/axios";

type Animal = {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  exportable: boolean;
};
export const Header = () => {
  const isVerified = useAppSelector((state) => state.data.isLoggedIn);
  const isPremium = useAppSelector((state) => state.data.isPremium);
  const [showPopBar, setShowPopBar] = React.useState(false);
  const [location, setLocation] = React.useState("New Delhi");
  const [search, setSearch] = React.useState("");
  const [detect, setDetect] = React.useState(false);
  const [products, setProducts] = React.useState<Animal[]>([]);
  const router = useRouter();
  const token = useAppSelector((state) => state.data.token);

  const popbarRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popbarRef.current &&
        !popbarRef.current.contains(event.target as Node)
      ) {
        setShowPopBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.trim();

    setSearch(keyword);

    // don't search for tiny inputs
    if (keyword.length < 3) {
      return;
    }

    try {
      const response = await apiClient.get(`/product/search`, {
        params: {
          q: keyword,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };
  const searchProducts = async () => {
    try {
      const trimmedSearch = search.trim();

      if (trimmedSearch.length < 3) {
        return;
      }

      const response = await apiClient.get("/product/search", {
        params: {
          q: trimmedSearch,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      setProducts(response.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };
  async function getCurrentLoaction() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      console.log("Geolocation is not supported by this browser.");
      return null;
    }

    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      },
    );

    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);

const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  );

  const data = await res.json();

  console.log(data.display_name);
setLocation(data.display_name.split(",")[0]);
    return data;
  }

  const handlePush = (id: string) => {
    router.push(`/livestock?livestock=${id}`);
  };
  return (
    <div className="flex flex-col w-full relative">
      <div className="px-4 flex flex-row justify-between items-center py-6 xl:px-36 ">
        <div>
          <h1 className="text-3xl font-handwriting font-extrabold ">
            Meat Truck
          </h1>
        </div>
        <div>
          <div
            className=" flex-row gap-2 bg-gray-100 hover:bg-gray-200 px-4 relative rounded-xl h-fit p-2  cursor-pointer justify-center items-center hidden md:flex"
            onClick={() => setDetect(!detect)}
          >
            <SlLocationPin className="mt-2" size={24} />
            <p className="text-sm">Deliver to:</p>
            <p className="font-bold hidden md:inline">{location}</p>
          </div>
          {detect && (
            <div className=" p-2 absolute  w-64 shadow-2xl bg-gray-100 z-40 flex flex-row gap-2 items-center rounded-xl cursor-pointer hover:bg-gray-200  md:flex mt-1">
              <div className="relative w-64 flex flex-row items-center gap-2">
                <FaLocationCrosshairs
                  className=" cursor-pointer"
                  fill="red"
                  size={18}
                />
                <div onClick={getCurrentLoaction}>
                  <p className="text-red-500 text-sm font-bold">
                    Detect Current Location
                  </p>
                  <p className="text-sm">Using GPS</p>
                </div>
                <TbXboxXFilled
                  className=" absolute top-[-10px] right-[-10px] cursor-pointer"
                  fill="red"
                  size={30}
                  onClick={() => setDetect(false)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="hidden  md:flex flex-row gap-5 items-center relative    ">
          <div className="flex ">
            <div className="flex gap-1 items-center shadow-2xl md:p-2 rounded-tl-2xl rounded-bl-2xl border ">
              <div className="">
                <IoSearch size={30} className="" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="md:p-2 outline-none"
                onChange={handleSearch}
              />
            </div>
            <div
              className="bg-black text-white rounded-tr-2xl rounded-br-2xl flex items-center cursor-pointer"
              onClick={searchProducts}
            >
              <p className="px-4 text-sm font-semibold">Search</p>
            </div>
          </div>

          <div className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-xl z-20 border max-h-80 overflow-y-auto">
            {products.length > 0 &&
              products.map((item: Animal) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 transition"
                  onClick={() => handlePush(item.id)}
                >
                  {/* Left Section */}
                  <div className="flex items-center gap-3">
                    <Image
                      src="https://meatbuckett.s3.eu-north-1.amazonaws.com/jaffarabadi.jpeg"
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover h-[60px] w-[60px]"
                    />

                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>

                      <p className="text-sm text-gray-500">{item.category}</p>

                      <p className="text-xs text-gray-400 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      ₹{item.price.toLocaleString()}
                    </p>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.exportable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.exportable ? "Exportable" : "Local"}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-row gap-5 relative">
          {/* <IoSearch className="size-8  lg:size-10 lg:hidden cursor-pointer" /> */}
          <FaShoppingCart
            className="size-8  lg:size-10 cursor-pointer"
            onClick={() => router.push("/cart")}
          />

          {isVerified ? (
            <FaRegUserCircle
              className="size-8  lg:size-10 cursor-pointer"
              onClick={() => setShowPopBar(!showPopBar)}
            />
          ) : (
            <Button
              className="px-8 py-6 cursor-pointer hover:scale-105"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          )}

          {isPremium && <CheckoutButton />}
        </div>
      </div>

      <div className="md:hidden 
        px-2 pb-1 w-full relative">
      
        <div className=" flex items-center gap-0 ">
            <input
          type="text"
          placeholder="Search"
          className="w-[90%] p-2 outline-1 rounded-tl-xl rounded-bl-xl"
          onChange={handleSearch}
        />
        <div className="bg-black p-1.5 rounded-tr-xl rounded-br-xl">
          <IoSearch size={30} fill="white" className="bg-black " />
        </div>

        </div>
          <div className="absolute top-10 left-0 w-full bg-white shadow-lg rounded-xl z-50 border max-h-80 overflow-y-auto px-2">
            {products.length > 0 &&
              products.slice(0 , 5).map((item: Animal) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 transition"
                  onClick={() => handlePush(item.id)}
                >
                  {/* Left Section */}
                  <div className="flex items-center gap-3">
                    <Image
                      src="https://meatbuckett.s3.eu-north-1.amazonaws.com/jaffarabadi.jpeg"
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover h-[60px] w-[60px]"
                    />

                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>

                      <p className="text-sm text-gray-500">{item.category}</p>

                      <p className="text-xs text-gray-400 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      ₹{item.price.toLocaleString()}
                    </p>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.exportable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.exportable ? "Exportable" : "Local"}
                    </span>
                  </div>
                </div>
              ))}
          </div>
      </div>

      <div className="w-full h-[500px] bg-cover bg-center relative">
        <div className="w-full h-full ">
          <Image
            src={Lbiryani}
            alt="Biryani"
            className="w-full h-full object-cover "
          />

          {showPopBar && (
            <div
              className="float-right ml-auto absolute top-0 right-12 z-40 "
              id="popbar"
              ref={popbarRef}
            >
              <PopBar />
            </div>
          )}
        </div>

        <div className="relative z-10 text-white p-4">
          <h1 className="text-3xl font-bold">Delicious Biryani</h1>
        </div>
      </div>
    </div>
  );
};
