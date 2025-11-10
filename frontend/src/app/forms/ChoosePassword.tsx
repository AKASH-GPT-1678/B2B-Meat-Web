import axios from "axios";
import React from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
export default function ChoosePassword({ email }: { email: string }) {
    const [passWord, setPassword] = React.useState("");
    const [confoirmPassword, setConfirmPassword] = React.useState("");
    const [someError, setSomeError] = React.useState(false);
    const [error, seterror] = React.useState(false);
    const [userName, setUserName] = React.useState("");
    const [askUserName, setaskUserName] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
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
  <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white shadow-lg border border-gray-200 rounded-2xl p-8 w-full max-w-md mx-auto">
    {askUserName ? (
      <div className="flex flex-col gap-5 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Choose Your Username
        </h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-gray-700 font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter a unique username"
            className="p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            value={userName}
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <button
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-sm"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {someError && (
          <p className="text-red-600 mt-2 text-center font-medium">
            Something went wrong. Try again!
          </p>
        )}
      </div>
    ) : (
      <div className="flex flex-col gap-5 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Set Your Password
        </h2>

        {/* Password Field */}
        <div className="relative flex flex-col">
          <label htmlFor="password" className="text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            className="p-3 border-2 border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-4 top-11 cursor-pointer text-gray-500 hover:text-gray-700 transition"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password Field */}
        <div className="relative flex flex-col">
          <label
            htmlFor="confirm-password"
            className="text-gray-700 font-medium mb-1"
          >
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirm-password"
            autoComplete="new-password"
            className="p-3 border-2 border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className="absolute right-4 top-11 cursor-pointer text-gray-500 hover:text-gray-700 transition"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {error && (
          <p className="text-red-600 mt-1 text-center font-medium">
            Passwords do not match
          </p>
        )}

        <button
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-sm mt-2"
          onClick={handlePasswordStep}
        >
          Next
        </button>
      </div>
    )}
  </div>
);

}
