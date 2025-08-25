import axios from "axios";
import React from "react";

export default function ChoosePassword({ email }: { email: string }) {
    const [passWord, setpassWord] = React.useState("");
    const [confoirmPassword, setconfirmPassWord] = React.useState("");
    const [someError, setSomeError] = React.useState(false);
    const [error, seterror] = React.useState(false);
    const [userName, setUserName] = React.useState("");
    const [askUserName, setaskUserName] = React.useState(false);
    const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;

    const handlePasswordStep = () => {
        if (passWord !== confoirmPassword) {
            seterror(true);
            return;
        };
        const input = document.getElementById("username") as HTMLInputElement;
        if (input) input.value = "";



        seterror(false);
        setaskUserName(true);

    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${endpoint}/auth/register`, {
                username: userName,
                email: email,
                password: passWord,
            });
            console.log(response.data);
            if (response.data === "User registered successfully!") {
                window.location.href = "/login";
            }
        } catch (error) {
            console.error(error);
            setSomeError(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6 p-4 border border-gray-300 rounded-md">
            {askUserName ? (
                <div className="flex flex-col gap-4">
                    <label htmlFor="username">Choose Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Choose Username"
                        className="p-2 border"
                        value={userName}   
                        autoComplete="off"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <button className="p-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>
                        Submit
                    </button>
                    {someError && (
                        <p className="text-red-600 mt-2">Something went wrong</p>
                    )}
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        className="p-3 px-10 border-2"
                        onChange={(e) => setpassWord(e.target.value)}
                    />
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        autoComplete="new-password"
                        className="p-3 px-10 border-2"
                        onChange={(e) => setconfirmPassWord(e.target.value)}
                    />
                    {error && (
                        <p className="text-red-600 mt-2">
                            Password and confirm Password not matching
                        </p>
                    )}
                    <button className="p-2 mt-4 bg-blue-500 text-white rounded" onClick={handlePasswordStep}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
