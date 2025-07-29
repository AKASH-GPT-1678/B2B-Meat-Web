import Image from "next/image"
import React from "react";
import OtpImage from "../../../assets/otp.png";

export default function OTPVerify() {

    const [userInput, setUserInput] = React.useState(["", "", "", ""]);
 

    const handleChange = (inde: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newInput = [...userInput]; // make a copy
        newInput[inde] = event.target.value; // update the correct index
        setUserInput(newInput); // set updated array


        const inputs = document.querySelectorAll("input");
        let index = inde;
        if (inputs[index].value && inde < 3) {
            inputs[index + 1].focus();
        }

        const backspace = document.addEventListener("keydown", function (event) {
            const key = event.key;
            if (key == "Backspace" && inde != 0) {

                inputs[inde].value = ""
            }
        })




    };

    async function handleVerification(array : string[]) {
        const joinValue = array.join("");
        console.log(joinValue);
      
        
        
    }


    return (

        <div className="h-[600px] border-2 flex items-center justify-center">
            <div className="max-w-[400px]   p-3 m-auto flex flex-col justify-center items-center">



                <Image src={OtpImage} alt="otp" className="max-w-[250px] max-h-[200px] " />
                <strong>We've sent an OTP to your email</strong>
                <p>Enter the OTP to verify your account</p>

                <div className="flex flex-row gap-3 mt-6">
     

                    {
                        [0, 1, 2, 4].map((item, index) => (
                            <div key={index}>
                                <input type="text" className="p-2 w-[50px] border-1" onChange={(event) => handleChange(index, event)} maxLength={1} />
                            </div>
                        ))
                    }



                </div>
                <div className="mt-8 w-full">
                    <button className="w-full p-2 text-white rounded-lg cursor-pointer bg-blue-500" onClick={()=>handleVerification(userInput)}>Submit</button>
                </div>






            </div>
        </div>
    )





}