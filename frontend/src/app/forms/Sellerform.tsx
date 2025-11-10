import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { businessFormSchema } from '../appcomponents/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { BusinessFormSchema } from '../appcomponents/validation';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/utils/reduxhook';
export const Sellerform = () => {

  const [someError, setSomeError] = React.useState(false);
  const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      name: '',
      address: '',
      pincode: '',
      estYear: new Date(),
      businessEmail: '',
      businessType: '',
      contact: '',
      alternateContact: '',


    }
  });

  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.data.token);

  async function verifyPincode(pincode: number): Promise<boolean> {
    try {


      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = response.data;
      console.log(data[0].Status);
      if (data[0].Status == "Success") {
        return true
      }
      else {
        return false;
      }
    } catch (error) {
      return false;

    }

  }

  const onSubmit: SubmitHandler<BusinessFormSchema> = async (data) => {

    const verify = verifyPincode(Number(data.pincode));
    if (!verify) return;
    try {
      const response = await axios.post(`${endpoint}/seller/create`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log(response.data);

      if (response.data.status === true) {
        window.location.href = "/sellerdashboard";
      }

    } catch (error) {
      console.error("Error submitting form:", error);
      setSomeError(true);  // Make sure this state exists in your component
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 sm:p-20 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Business Registration Form</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {/* Name */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Name</label>
          <input
            type="text"
            {...register("name")}
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Address</label>
          <input
            type="text"
            {...register("address")}
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
        </div>

        {/* Pincode */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Pincode</label>
          <input
            type="text"
            {...register("pincode")}
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.pincode && <span className="text-red-500 text-sm">{errors.pincode.message}</span>}
        </div>

        {/* Establishment Year */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Establishment Year</label>
          <input
            type="date"
            {...register("estYear")}
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.estYear && <span className="text-red-500 text-sm">{errors.estYear.message}</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            {...register("businessEmail")}
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.businessEmail && <span className="text-red-500 text-sm">{errors.businessEmail.message}</span>}
        </div>

        {/* Business Type */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Business Type</label>
          <input
            type="text"
            {...register("businessType")}
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.businessType && <span className="text-red-500 text-sm">{errors.businessType.message}</span>}
        </div>

        {/* Contact */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Contact</label>
          <input
            type="text"
            {...register("contact")}
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.contact && <span className="text-red-500 text-sm">{errors.contact.message}</span>}
        </div>

        {/* Alternate Contact */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Alternate Contact</label>
          <input
            type="text"
            {...register("alternateContact")}
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.alternateContact && <span className="text-red-500 text-sm">{errors.alternateContact.message}</span>}
        </div>

        {
          someError && <span className="text-red-500 text-sm max-w-[400px]">Something Went Wrong Make Sure Details are accurate</span>
        }
        <div className="col-span-1 sm:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition duration-300 shadow-md hover:shadow-xl"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
