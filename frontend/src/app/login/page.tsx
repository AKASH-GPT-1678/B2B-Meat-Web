"use client";
import React from 'react'
import { Login } from '../forms/Login';
import { SignUp } from '../Components/SignUp';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { setisLoggedIn, setToken } from '../Components/redux-persit';
import { useAppSelector, useAppDispatch } from '@/utils/reduxhook';
const LoginPage = () => {
  const session = useSession();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.data.token);
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  React.useEffect(() => {

    async function loginWithGoogle(email: string, username: string, password: string) {
      try {
        const response = await axios.post(`${BASE_URL}/auth/google`, {
          email: email,
          username: username,
          password: password, // can be dummy like "google-auth"o
        });

        const data = response.data;

        console.log("Login successful:", data);
        dispatch(setToken(data.data.token));
        dispatch(setisLoggedIn(true));

        // Store JWT token (optional)
        ;

        return data;
      } catch (error: any) {
        console.error("Google login error:", error.response?.data || error.message);
        throw error;
      }
    }




    console.log(session)
    if (session.status == "authenticated" && session.data.user) {
      console.log(session);

      const email = session?.data?.user?.email;
      const name = session?.data?.user?.name; // was using 'session.data.user.name'
      const password = session?.data?.user?.email; // don't reuse email for password – just for demo

      console.log("Email:", email);
      console.log("Name:", name);

      if (email && name && password) {
        loginWithGoogle(email, name, password).then((data) => {
          console.log(data);
          if (data.message === "Login successful") {
            window.location.href = `/?hello=chalo`;
          }
        });
      } else {
        console.error("Missing user data from session");
      }



    }

  }, [session]);
  return (
    <div className='flex items-center justify-center'>

      <SignUp />

    </div>
  )
}

export default LoginPage
