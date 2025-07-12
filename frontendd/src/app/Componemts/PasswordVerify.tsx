"use client";
import React, { useState } from "react";
import axios from "axios";
import { setToken } from "./redux-persit";
import { useDispatch } from "react-redux";

export default function PasswordVerify({ email }: { email: string }) {
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                email: email,
                password: password,
            });

            setMessage(response.data.message || "Password verified successfully!");
            dispatch(setToken(response.data.token));
            console.log(response.data)
        } catch (error: any) {
            setMessage(error?.response?.data?.message || "Verification failed.");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "auto", padding: "1rem" }} className="flex flex-col gap-2">
            <h2>Password Verification</h2>
            <p>We found your email: <strong>{email}</strong></p>

            <div style={{ marginTop: "1rem" }}>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
                />
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
