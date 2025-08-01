import axios from "axios";
import { p } from "framer-motion/client";
import React, { use } from "react";

export default function ChoosePassword({ email }: { email: string }) {
    const [passWord, setpassWord] = React.useState("");
    const [confoirmPassword, setconfirmPassWord] = React.useState("");
    const [someError, setSomeError] = React.useState(false);
    const [error, seterror] = React.useState(false);
    const [userName, setUserName] = React.useState("");
    const [askUserName, setaskUserName] = React.useState(false);

    const userNamesetUp = () => {
        if (error) {
            return;
        } else {
            setaskUserName(true);
        }
    };

    const handleSubmit = async () => {
        if (passWord != confoirmPassword) {
            seterror(true);
        }
        try {
            const response = await axios.post("http://localhost:8080/auth/register", {
                username: userName,
                email: email,
                password: passWord,
            });
            console.log(response.data);
            if (response.data == "User registered successfully!") {
                window.location.href = "/login"
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-6 p-4 border border-gray-300 rounded-md">
                <div>
                    {askUserName ? (
                        <div className="flex flex-col gap-4">
                            <label htmlFor="">Choose Username</label>
                            <input type="text" placeholder="Choose Username" className="p-2" onChange={(e) => setUserName(e.target.value)} />

                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Password</label>
                            <input
                                type="text"
                                id="password"
                                className="p-3 px-10 border-2"
                                onChange={(e) => setpassWord(e.target.value)}
                            />
                            {error && (
                                <p className="text-red-600">
                                    Password and confirm Password not matching
                                </p>
                            )}

                            <div className="flex flex-col gap-2 mt-4">
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input
                                    type="text"
                                    id="confirm-password"
                                    className="p-3 px-10 border-2"
                                    onChange={(e) => setconfirmPassWord(e.target.value)}
                                />
                                {error && (
                                    <p className="text-red-600">
                                        Password and confirm Password not matching
                                    </p>
                                )}
                            </div>
                            {
                                someError && (
                                    <p className="text-red-600 mt-4">
                                        Something went wrong
                                    </p>
                                )
                            }
                            <button className="p-2 cursor-pointer" onClick={userNamesetUp}>
                                Submit
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
