"use client";
import React from "react";
import Image from "next/image";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { sendMessageOnce } from "@/lib/chatrequest";
import { useAppSelector } from "@/utils/reduxhook";

export interface ProductResponseDTO {
  id: string;
  name: string;
  description: string;
  category: string; // normalized from "category" / "category : "BUFFALO""
  price: number; // numeric price
  productImgUrl: string;
  sellerId: string;
  sellerName?: string | null;
  minimumOrderQuantity: number; // numeric MOQ
  exportable: boolean;
  createdOn: Date;
  updatedOn: Date | null;
  exportableRaw?: boolean; // raw boolean (keeps raw if needed)
  raw?: unknown; // keep original if needed for debugging
}
const LiveStockPage = () => {
  const searchParams = useSearchParams();
  const [product, setProduct] = React.useState<ProductResponseDTO>();
  const [error, setError] = React.useState(false);
  const [minimumOrderQuantity, setMinimumOrderQuantity] =
    React.useState<number>(0);
  const [quantity, setQuantity] = React.useState<number>(0);
  const chatEndpoint = process.env.NEXT_PUBLIC_CHAT_URL;

  const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;
  const myUserId = useAppSelector((state) => state.data.userId);
  const router = useRouter();

  const livestockId = searchParams.get("livestock");
  React.useEffect(() => {
    if (!livestockId) return;

    const fetchProduct = async (): Promise<ProductResponseDTO | undefined> => {
      try {
        const response = await axios.get(`${endpoint}/product/livestock`, {
          params: { id: livestockId },
        });
        setProduct(response.data);
        console.log(response.data);
        setError(false);
        setMinimumOrderQuantity(Number(response.data.minimumOrderQuantity));
        setQuantity(Number(response.data.minimumOrderQuantity));

        return undefined;
      } catch (err: unknown) {
        console.error(err);
        setError(true);
      } finally {
      }
    };

    fetchProduct();
  }, [livestockId]);
  const handleMinimumOrderQuantity = () => {
    if (quantity < minimumOrderQuantity) {
      setMinimumOrderQuantity(minimumOrderQuantity - 1);
    }
  };

  return (
    <div className="">
      {!error && product && (
        <div className=" p-10 xl:p-40 grid md:grid-cols-2 bg-gray-100 ">
          <div
            className="flex flex-col gap-8

                
                "
          >
            <div>
              <Image
                src={product.productImgUrl}
                width={400}
                height={400}
                alt="product"
                className="rounded-2xl w-full shadow-2xl sm:w-[400px]  min-h-[300px] xl:w-[500px] xl:h-[500px]"
              />
            </div>
            <div className="flex flex-row gap-4 w-full sm:w-[400px] xl:w-[500px]  p-6">
              <div className="flex-1 min-h-[100px] relative rounded-lg overflow-hidden">
                <Image
                  src={product.productImgUrl}
                  alt="Chicken 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-h-[100px] relative rounded-lg overflow-hidden">
                <Image
                  src={product.productImgUrl}
                  alt="Chicken 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-h-[100px] relative rounded-lg overflow-hidden">
                <Image
                  src={product.productImgUrl}
                  alt="Chicken 3"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-h-[100px] relative rounded-lg overflow-hidden">
                <Image
                  src={product.productImgUrl}
                  alt="Chicken 4"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center max-w-[600px] ">
            <h2>{product.name}</h2>
            <h1 className="font-bold text-4xl">{product.name}</h1>

            <div className="mt-2">
              <p
                className="text-blue-500 font-bold cursor-pointer"
                onClick={() =>
                  router.push(`/sellerprofile/${product.sellerId}`)
                }
              >
                {product.sellerName}
              </p>
            </div>

            <span className="mt-4">{product.description}</span>
            <p className="font-bold text-4xl mt-5">{product.price}</p>
 

<div className="flex flex-col items-center sm:items-start justify-center">

  {/* Exportable */}
  <div className="flex items-center gap-4 mt-10">
    <p className="font-bold">Exportable</p>

    {product?.exportable ? (
      <TiTick size={30} fill="green" />
    ) : (
      <ImCross size={18} fill="red" />
    )}
  </div>

  {/* Quantity */}
  <div className="flex items-center justify-center bg-gray-200 w-[200px] py-3 rounded-2xl mt-10">
    <button
      className="flex-1 text-3xl font-bold cursor-pointer"
      onClick={() => handleMinimumOrderQuantity()}
    >
      -
    </button>

    <button className="flex-1 text-xl font-bold">
      {minimumOrderQuantity}
    </button>

    <button
      className="flex-1 text-3xl font-bold cursor-pointer"
      onClick={() =>
        setMinimumOrderQuantity(minimumOrderQuantity + 1)
      }
    >
      +
    </button>
  </div>

  {/* Buttons */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 w-full max-w-md place-items-center">
    <div className="flex items-center justify-center bg-orange-400 w-[200px] py-3 rounded-2xl cursor-pointer">
      <span className="font-bold text-lg">
        Add Cart
      </span>
    </div>

    <div className="flex items-center justify-center bg-orange-400 w-[200px] py-3 rounded-2xl cursor-pointer">
      <span
        className="font-bold text-lg"
        onClick={() =>
          sendMessageOnce({
            endpoint: chatEndpoint ?? "",
            userId: myUserId ?? "",
            sellerId: product.sellerId,
          })
        }
      >
        Contact Seller
      </span>
    </div>
  </div>

</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveStockPage;
