import React from 'react'
import { useForm ,SubmitHandler} from 'react-hook-form'
import { businessFormSchema } from './validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { BusinessFormSchema } from './validation';
export const Sellerform = () => {
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(businessFormSchema),
        defaultValues: {
            name: '',
            address: '',
            pincode: 0,
            estYear: '',
            email: '',
            businessType: '',
            contact: '',
            alternateContact: '',
       
           
        }
    });

    const onSubmit: SubmitHandler<BusinessFormSchema> = (data) => {
        console.log(data);
      };
  return (
    <div  className='max-w-[800px] p-20 shadow-2xl rounded-2xl bg-white '>
      <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-2 bg-white'>
  <div className='flex flex-col gap-2'>
    <label>Name: </label>
    <input
      type="text"
      {...register('name')}
      className='p-2  border border-black rounded-xl'
    />
  </div>

  <div className='flex flex-col gap-2'>
    <label>Address: </label>
    <input
      type='text'
      {...register('address')}
      className='p-2  border border-black rounded-xl'
    />
  </div>

  <div className='flex flex-col gap-2'>
    <label>Pincode: </label>
    <input
      type="number"
      {...register('pincode')}
      className='p-2 border border-black rounded-xl'
      maxLength={6}
    />
  </div>

  <div className='flex flex-col gap-2'>
    <label>Establishment Year: </label>
    <input
      type="date"
      {...register('estYear')}
      className='p-2 border border-black rounded-xl'
    />
  </div>

  <div className='flex flex-col gap-2'>
    <label>Email: </label>
    <input
      type="email"
      {...register('email')}
      className='p-2  border border-black rounded-xl'
    />
  </div>

  <div className='flex flex-col gap-2'>
    <label>Business Type: </label>
    <input
      type="text"
      {...register('businessType')}
      className='p-2  border border-black rounded-xl'
    />
  </div>

  <div className='flex flex-col gap-2'>
    <label>Contact: </label>
    <input
      type='text'
      {...register('contact')}
      className='p-2  border border-black rounded-xl'
    />
  </div>

  <div className='flex flex-col gap-2'>
    <label>Alternate Contact: </label>
    <input
      type='text'
      {...register('alternateContact')}
      className='p-2  border border-black rounded-xl'
    />
  </div>

  <button type="submit">Submit</button>
</form>


    </div>
  )
}
