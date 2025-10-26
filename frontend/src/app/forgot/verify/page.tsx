"use client";
import { useSearchParams } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import LiveStock from "../../../assets/livestock.png";

import OtpImage from "../../../../assets/otp.png";
import { tr } from 'framer-motion/client';
import UpdatePasswordSetup from '@/app/forms/UpdatePasswordSetup';
import { set } from 'zod/v4-mini';

export interface ApiResponse {
    success: boolean;
    message: string;
}

const Page = () => {
    const [isOtp, setIsOtp] = React.useState(false);
    const [passwordMode, setPasswordMode] = React.useState(false);
    const searchparams = useSearchParams();
    const state = searchparams.get("email");
    const mode = searchparams.get("mode");
    
    const [userInput, setUserInput] = React.useState(["", "", "", ""]);

    const handleChange = (inde: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newInput = [...userInput];
        newInput[inde] = event.target.value;
        setUserInput(newInput);

        const inputs = document.querySelectorAll("input");
        if (event.target.value && inde < 3) {
            (inputs[inde + 1] as HTMLInputElement).focus();
        }
    };

    const handleVerification = (array: string[]) => {
        const joinValue = array.join("");
        console.log(joinValue);
        return joinValue;
    };

    React.useEffect(() => {
        if (mode === "otp") {
            setIsOtp(true);
        }
    }, [mode]);


    interface OtpRequestDto {
        otp: string;
        userEmail: string

    }

    const verifyOtp = async (email: string, otp: string[]): Promise<ApiResponse> => {
        console.log(email);
        const Otp = handleVerification(otp);
        console.log("iam email", email);

        try {
            const requestData: OtpRequestDto = {
                otp: Otp,
                userEmail: email,

            };

            const response = await axios.post<ApiResponse>(
                'http://localhost:8080/auth/forgotOtp',
                requestData
            );
            console.log(response.data);
            if (response.data.success == true) {
                setPasswordMode(true);

            }

            return response.data;
        } catch (error) {
            console.error('OTP verification failed:', error);
            ;
            return {
                success: false,
                message: "Invalid OTP"
            }
        }
    };




    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-[800px] shadow-2xl rounded-xl overflow-hidden bg-white">
                {!passwordMode && (
                    <div className="flex flex-col items-center justify-center w-full py-8 px-4">

                        <div className="w-full flex flex-col items-center justify-center">
                            <div className="max-w-[400px] w-full p-4 flex flex-col justify-center items-center gap-3">
                                <Image src={OtpImage} alt="otp" className="max-w-[200px] max-h-[150px]" />
                                <strong>We've sent an OTP to your email <p className='font-bold'>{state}</p></strong>
                                <p className="text-center text-sm text-gray-600">Enter the OTP to verify your account</p>

                                <div className="flex flex-row gap-3 mt-4">
                                    {[0, 1, 2, 3].map((item, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            className="p-2 w-[50px] border border-gray-400 rounded text-center text-xl"
                                            maxLength={1}
                                            value={userInput[index]}
                                            onChange={(event) => handleChange(index, event)}
                                            onKeyDown={(event) => {
                                                if (event.key === "Backspace" && !userInput[index] && index > 0) {
                                                    const inputs = document.querySelectorAll("input");
                                                    (inputs[index - 1] as HTMLInputElement).focus();
                                                }
                                            }}
                                        />
                                    ))}
                                </div>


                                <button
                                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded"
                                    onClick={() => verifyOtp("gptakashpc23@gmail.com", userInput)}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>


                    </div>
                )}
            </div>
            <div className="w-full max-w-[800px] shadow-2xl rounded-xl overflow-hidden bg-white">
                {passwordMode && (
                    <div className="flex flex-col items-center justify-center w-full py-8 px-4">
                        <UpdatePasswordSetup email={state as string} />
                    </div>
                )}
            </div>
        </div>

    );
};

export default Page;
