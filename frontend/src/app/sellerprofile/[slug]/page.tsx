"use client";
import apiClient from "@/lib/axios";
import { useAppSelector } from "@/utils/reduxhook";
import { useParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import Biryani from "../../../../assets/biryani.png";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineReportProblem } from "react-icons/md";

export interface Product {
  productId: string;
  status: boolean;
  message: string | null;
  productName: string;
  productImgUrl: string;
}

interface Blog {
  // Add fields later when blog structure is available
}

interface FarmBusiness {
  id: string;
  name: string;
  address: string;
  businessEmail: string;
  pincode: number;
  estYear: string; // ISO Date String
  businessType: string;
  contact: number;
  alternateContact: number;
  fssaiLicence: string | null;
  udyamLicense: string | null;
  tradingLicense: string | null;
  aadharcardUrl: string | null;
  kycVerified: boolean;
  createdOn: string; // ISO Date String
  updatedOn: string | null;
  products: Product[];
  blogs: Blog[];
}
export default function SellerProfile() {
  const params = useParams();
  const token = useAppSelector((state) => state.data.token);
  const [seller, setSeller] = React.useState<FarmBusiness>();

  if (!params.slug) return <div>Loading...</div>;

  const loadSeller = async () => {
    try {
      const response = await apiClient.get(`/seller/details/${params.slug}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setSeller(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    loadSeller();
  }, []);

  return (
    <div className="p-4">

      <div className="p-4 border-2 border-black">
        <div className="flex flex-col md:flex-row w-full">
          <div>
            <Image src={Biryani.src} width={200} height={240} alt="images" />
          </div>
          <div className="px-4">
            <h2 className="font-bold text-2xl md:text-4xl">{seller?.name}</h2>
            <p>Registration Jun 19 2020</p>
            <div className="flex items-center gap-2 mt-4">
              <FaUsers size={20} color="green" />
              <p>132 Subscribers</p>
            </div>
            <div className="flex flex-row gap-4 items-center justify-center mt-4">
              <button className="bg-yellow-300  px-4 py-2 rounded-lg cursor-pointer">
                Subscribe{" "}
              </button>

              <div className="flex gap-2 cursor-pointer">
                <MdOutlineReportProblem size={20} />
                <p>Report</p>
              </div>
            </div>
          </div>
          <div className="ml-4 max-w-48">
            <p>{seller?.address}</p>
          </div>
          <div className="ml-auto flex flex-col gap-1">
            <div className="bg-black w-48 ">
              <p className="p-4 text-center font-bold text-white">Follow</p>
            </div>
            <div className="bg-gray-200">
              <p className="p-4 text-center font-bold">{"14,766 Seller"} </p>
            </div>
            <div className="bg-gray-200">
              <p className="p-4 text-center font-bold">{"14,766 Seller"} </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-2 w-full  h-10 flex ">
        <div className="w-[20%]">
          <p className="font-bold text-3xl italic">Blogs</p>
          <div>

          </div>
        </div>
        <div className="w-[80%] border-2 border-amber-300 h-10">
          <p className="font-bold text-3xl1` italic text-3xl">Products (246)</p>
          <div className=" mt-6">
            <select name="" id="" className="py-2 px-10 bg-gray-100">
              <option value="ALl">Show All</option>
              <option value="">Less</option>
              <option value="">More</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {seller?.products.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden
                 hover:shadow-2xl transition-all duration-300
                 hover:-translate-y-2 cursor-pointer border"
              >
                {/* Image */}
                <div className="w-full h-56 overflow-hidden bg-gray-100">
                  {item.productImgUrl && (
                    <Image
                      src={item.productImgUrl}
                      alt="image"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <p className="text-xl font-semibold text-gray-800">
                    {item.productName}
                  </p>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    Premium quality product with modern styling and clean
                    design.
                  </p>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between pt-3">
                    <p className="text-2xl font-bold text-green-600">₹499</p>

                    <button
                      className="px-4 py-2 rounded-xl bg-black text-white
                       hover:bg-gray-800 transition-colors duration-300"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
