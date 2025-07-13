'use client';
import React from 'react'
import Image from 'next/image'
import { MdCloudUpload } from "react-icons/md";


const SellerDocs = () => {
    const [fssai, setFssai] = React.useState(false);
    const [fssaiUrl, setFssaiUrl] = React.useState<string>('');
    const fssaiLicenceRef = React.useRef<HTMLInputElement>(null);
    // const udyamLicenseRef = React.useRef<HTMLInputElement>(null);
    // const tradingLicenseRef = React.useRef<HTMLInputElement>(null);
    // const aadharCardRef = React.useRef<HTMLInputElement>(null);


    const handleFssaiLicenceUpload = () => {

        const files = fssaiLicenceRef.current?.files;
        if (files && files.length > 0) {
            const file = files[0]
            console.log(fssai)
 

            const fssaiUrl = URL.createObjectURL(file)
            setFssai(true)
            setFssaiUrl(fssaiUrl)
            // const food = document.getElementById("fssai") as HTMLImageElement
            // food.setAttribute("src") = fssaiUrl
        

        }
    };

    // const handleUdyamLicenseUpload = () => {
    //     // logic for Udyam Licence upload
    // };

    // const handleTradingLicenseUpload = () => {
    //     // logic for Trading Licence upload
    // };

    // const handleAadharCardUpload = () => {
    //     // logic for Aadhar Card upload
    // };




    return (
        <div>



            <div className='h-[200px] w-[300px] border-6 border-gray-400 border-dotted bg-white flex flex-col items-center  justify-center'>

                <p>FSSAI Certificate</p>



                          {/* {fssai ? ( */}
                <Image
                    src={fssaiUrl}
                    alt="fssai preview"
                    id="fssai"
                    width={150}
                    height={150}
                />





                <label htmlFor="file" className='cursor-pointer p-3 bg-blue-500 text-white rounded-2xl px-8'>Select File</label>
                <input type="file" name="file" id="file" className='hidden' onChange={handleFssaiLicenceUpload} />

            </div>

            <div className='h-[200px] w-[300px] border-6 border-gray-400 border-dotted bg-white flex flex-col items-center  justify-center'>

                <p>Udyam Certificate</p>


                <MdCloudUpload size={100} fill='blue' />


                <label htmlFor="file" className='cursor-pointer p-3 bg-blue-500 text-white rounded-2xl px-8'>Select File</label>
                <input type="file" name="file" id="file" className='hidden' />

            </div>

            <div className='h-[200px] w-[300px] border-6 border-gray-400 border-dotted bg-white flex flex-col items-center  justify-center'>

                <p>Trading Licence</p>


                <MdCloudUpload size={100} fill='blue' />


                <label htmlFor="file" className='cursor-pointer p-3 bg-blue-500 text-white rounded-2xl px-8'>Select File</label>
                <input type="file" name="file" id="file" className='hidden' />

            </div>

            <div className='h-[200px] w-[300px] border-6 border-gray-400 border-dotted bg-white flex flex-col items-center  justify-center'>

                <p>Aadhar card</p>


                <MdCloudUpload size={100} fill='blue' />


                <label htmlFor="file" className='cursor-pointer p-3 bg-blue-500 text-white rounded-2xl px-8'>Select File</label>
                <input type="file" name="file" id="file" className='hidden' />

            </div>
        </div>
    )
}

export default SellerDocs;
