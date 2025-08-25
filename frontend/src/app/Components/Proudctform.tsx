"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/utils/reduxhook";

export interface Product {
  id: string;
  name: string;
  description: string;
  minimumOrderQuantity: string;
  price: number;
  productImgUrl: string;
  exportable: boolean;
  category: string;
  createdOn: string;
  updatedOn: string;
}

const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(100),
  description: z.string().min(1, "Description is required").max(1000),
  minimumOrderQuantity: z
    .string()
    .min(1, "Minimum Order Quantity must gre greater than 1"),
  price: z
    .number({ invalid_type_error: "Price is required" })
    .positive("Price must be a positive number")
    .max(1_000_000, "Price seems unreasonably high"),
  category: z.string().min(1, "Category Cannot be Empty"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.data.token);
  const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;

  const onSubmit: SubmitHandler<ProductFormData> = async (data: ProductFormData) => {
    const formData = new FormData();
    console.log(data);

    // Append form fields
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("minimumOrderQuantity", data.minimumOrderQuantity);
    formData.append("price", data.price.toString());
    formData.append("category", data.category);

    // Append file
    if (selectedFile) {
      formData.append("file", selectedFile);
    }


    try {
      const response = await fetch(`${endpoint}/product/create`, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`

        }
      });

      if (response.ok) {
        alert("Product submitted successfully!");
        window.location.reload();
      } else {
        alert("Failed to submit product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-5"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>

      <div>
        <label className="font-semibold">Name</label>
        <input
          {...register("name")}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="font-semibold">Description</label>
        <textarea
          {...register("description")}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          rows={4}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="font-semibold">Minimum Order Quantity</label>
        <input
          {...register("minimumOrderQuantity")}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.minimumOrderQuantity && (
          <p className="text-red-500">
            {errors.minimumOrderQuantity.message}
          </p>
        )}
      </div>

      <div>
        <label className="font-semibold">Price</label>
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.price && (
          <p className="text-red-500">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label className="font-semibold">Category</label>
        <select  id="category" {...register("category")}>
          <option value="BUFFALO">Buffalo</option>
          <option value="CHICKEN">Chicken</option>
          <option value="GOAT">Goat</option>
          <option value="EGGS">Eggs</option>
          <option value="SHEEP">Sheep</option>
          <option value="SEAFOOD">Seafood</option>
        </select>

        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="font-semibold">Upload Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setSelectedFile(e.target.files ? e.target.files[0] : null)
          }
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Submit Product
      </button>
    </form>
  );
}
