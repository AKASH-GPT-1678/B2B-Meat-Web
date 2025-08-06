"use client";
import React from 'react'
import { Login } from '../Components/Login';
import { SignUp } from '../Components/SignUp';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { setisLoggedIn, setToken } from '../Components/redux-persit';
import { useAppSelector, useAppDispatch } from '@/utils/reduxhook';
const LoginPage = () => {
  const session = useSession();
  const dispatch = useAppDispatch();

  React.useEffect(() => {

    async function loginWithGoogle(email: string, username: string, password: string) {
      try {
        const response = await axios.post('http://localhost:8080/api/auth/google-login', {
          email: email,
          userName: username,
          password: password, // can be dummy like "google-oauth"
        });

        const data = response.data;

        console.log("Login successful:", data);
        dispatch(setToken(data.token));
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

      loginWithGoogle(session.data.user.email as string, session.data.user.name as string, session.data.user.email as string).then((data) => {
        if(data.message = "Login successful"){
              window.location.href = `/?hello=chalo`;
          
        }
      });

  


    }

  }, [session]);
  return (
    <div className='flex items-center justify-center'>
      <SignUp />

    </div>
  )
}

export default LoginPage
