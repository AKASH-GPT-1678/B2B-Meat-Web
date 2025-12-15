"use client";
import React, { useState } from "react";
import axios from "axios";
import { setToken } from "../appcomponents/redux-persit";

import { useAppDispatch} from "@/utils/reduxhook";
import { FaEye } from "react-icons/fa";
export default function PasswordVerify({ email }: { email: string }) {
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;


    const dispatch = useAppDispatch();


    const handleSubmit = async () => {
        console.log(email);
        console.log(password);
        try {
            const response = await axios.post(`${endpoint}/auth/login`, {
                email: email.trim(),
                password: password.trim(),
            });


            setMessage(response.data.message || "Password verified successfully!");
            console.log(response.data.data.token);
            dispatch(setToken(response.data.data.token));
            if (response.data.success == true) {
                window.location.href = "/";
            };
            console.log(response.data)
        } catch (error: any) {
            setMessage(error?.response?.data?.message || "Verification failed.");
        }
    };

    React.useEffect(() => {

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleSubmit();
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };





    }, [password]);

    return (
        <div style={{ maxWidth: 400, margin: "auto", padding: "1rem" }} className="flex flex-col gap-2">
            <h2>Password Verification</h2>
            <p>We found your email: <strong>{email}</strong></p>

            <div style={{ marginTop: "1rem" }} className="flex flex-row justify-between items-center">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "90%", padding: "0.5rem", fontSize: "1rem" }}
                    className="py-2"
                />

                <FaEye size={20} className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}/>


            </div>

            <button
                onClick={handleSubmit}
                style={{
                    marginTop: "1rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Submit
            </button>

            {message && (
                <div style={{ marginTop: "1rem", color: "green" }}>
                    {message}
                </div>
            )}
        </div>
    );
}
