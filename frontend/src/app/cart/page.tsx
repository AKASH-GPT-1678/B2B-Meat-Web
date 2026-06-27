"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/axios";

import { ProductResponseDTO } from "../livestock/page";
import { useAppSelector } from "@/utils/reduxhook";

const CartView = () => {
  const [cartProducts, setCartProducts] = useState<ProductResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
const token = useAppSelector((state) => state.data.token);

useEffect(() => {
  const fetchCart = async () => {
    try {
      const response = await apiClient.get<ProductResponseDTO[]>(
        "/product/my_cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setCartProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  if (token) {
    fetchCart();
  }
}, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">🛒 My Cart</h1>

      {cartProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-xl shadow">
          <p className="text-2xl font-semibold text-gray-600">
            Your cart is empty
          </p>
          <p className="text-gray-500 mt-2">
            Start adding products to your cart.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {cartProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition flex flex-col md:flex-row overflow-hidden"
            >
              {/* Image */}

              <div className="w-full md:w-72 h-64 bg-gray-100 flex items-center justify-center">
                <img
                  src={product.productImgUrl}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Details */}

              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold">{product.name}</h2>

                    <span className="text-2xl font-bold text-green-600">
                      ₹{product.price}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {product.category}
                    </span>

                    {product.exportable && (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        Exportable
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-gray-600">
                    {product.description}
                  </p>

                  <div className="mt-5 grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Seller</p>

                      <p className="font-semibold">
                        {product.sellerName ?? "Unknown Seller"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Minimum Order Quantity
                      </p>

                      <p className="font-semibold">
                        {product.minimumOrderQuantity}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}

                <div className="mt-6 flex gap-3">
                  <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition">
                    Remove
                  </button>

                  <button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
};

export default CartView;