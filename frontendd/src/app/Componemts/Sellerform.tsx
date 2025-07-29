import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { businessFormSchema } from './validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { BusinessFormSchema } from './validation';
import axios from 'axios';
export const Sellerform = () => {
  const { register, handleSubmit , formState : {errors}} = useForm({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      name: '',
      address: '',
      pincode: '',
      estYear: '',
      email: '',
      businessType: '',
      contact: '',
      alternateContact: '',


    }
  });

  const onSubmit: SubmitHandler<BusinessFormSchema> = async (data) => {
     const response = await axios.post('http://localhost:8080/seller/create', data);
    console.log(response.data);
    
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
          {...register("email")}
          className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
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

      {/* Submit Button */}
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


// export default function BusinessForm() {
//   return (
//     <form action="/api/submit" method="POST" encType="multipart/form-data">
//       <h2>Business Registration Form</h2>

//       <label>Name*</label>
//       <input type="text" name="name" required />

//       <label>Address*</label>
//       <input type="text" name="address" required />

//       <label>Pincode*</label>
//       <input type="number" name="pincode" required min="100000" max="999999" />

//       <label>Establishment Year*</label>
//       <input type="date" name="estYear" required />

//       <label>Email*</label>
//       <input type="email" name="email" required />

//       <label>Business Type*</label>
//       <input type="text" name="businessType" required />

//       <label>Primary Contact*</label>
//       <input type="tel" name="contact" pattern="\d{10}" maxLength={10} required />

//       <label>Alternate Contact*</label>
//       <input type="tel" name="alternateContact" pattern="\d{10}" maxLength={10} required />

//       <label>FSSAI Licence (PDF)*</label>
//       <input type="file" name="fssaiLicence" accept="application/pdf" required />

//       <label>Udyam Licence (PDF)*</label>
//       <input type="file" name="udyamLicense" accept="application/pdf" required />

//       <label>Trading Licence (PDF)*</label>
//       <input type="file" name="tradingLicense" accept="application/pdf" required />

//       <label>Aadhar Card (PDF)*</label>
//       <input type="file" name="aadharcardUrl" accept="application/pdf" required />

//       <br /><br />
//       <button type="submit">Submit</button>

//       <style jsx>{`
//         form {
//           max-width: 500px;
//           margin: 20px auto;
//           display: flex;
//           flex-direction: column;
//         }

//         label {
//           margin-top: 10px;
//           font-weight: bold;
//         }

//         input {
//           padding: 8px;
//           margin-top: 4px;
//         }

//         button {
//           margin-top: 20px;
//           padding: 10px;
//           font-weight: bold;
//         }
//       `}</style>
//     </form>
//   );
// }
