"use client";
import { useSearchParams } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import LiveStock from "../../../assets/livestock.png";
import PasswordVerify from '../Componemts/PasswordVerify';
import OtpImage from "../../../assets/otp.png";
import { tr } from 'framer-motion/client';
import ChoosePassword from '../Componemts/ChoosePassword';
import { stat } from 'fs';

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

    const handleVerification = async (array: string[]) => {
        const joinValue = array.join("");
        console.log(joinValue);
        setPasswordMode(true)
    };

    React.useEffect(() => {
        if (mode === "otp") {
            setIsOtp(true);
        }
    }, [mode]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-row max-w-[800px] max-h-[1000px] justify-center items-center shadow-2xl">
                {!passwordMode && (
                    <div className="w-full lg:w-1/2">
                        {isOtp ? (
                            <div className="h-[600px] border-2 flex items-center justify-center">
                                <div className="max-w-[400px] p-3 m-auto flex flex-col justify-center items-center">
                                    <Image src={OtpImage} alt="otp" className="max-w-[250px] max-h-[200px]" />
                                    <strong>We've sent an OTP to your email</strong>
                                    <p>Enter the OTP to verify your account</p>

                                    <div className="flex flex-row gap-3 mt-6">
                                        {[0, 1, 2, 3].map((item, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                className="p-2 w-[50px] border border-gray-400 rounded text-center"
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

                                    <div className="mt-8 w-full">
                                        <button
                                            className="w-full p-2 text-white rounded-lg cursor-pointer bg-blue-500"
                                            onClick={() => handleVerification(userInput)}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <PasswordVerify email={state as string} />
                        )}
                    </div>
                )}

                {
                    passwordMode && (
                        <div className='w-full lg:w-1/2'>
                            <ChoosePassword email={state as string}/>
                        </div>
                    )
                }
                {

                }
                
        

                <div className="w-1/2 hidden lg:inline h-[600px] rounded-2xl">
                    <Image
                        src={LiveStock}
                        className="w-full h-full object-cover rounded-2xl"
                        alt="images"
                    />
                </div>
            </div>
        </div>
    );
};

export default Page;
