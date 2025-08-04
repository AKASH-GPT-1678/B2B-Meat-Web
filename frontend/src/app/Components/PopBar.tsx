import React from 'react'
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useAppSelector, useAppDispatch } from '@/utils/reduxhook';
import { setToken } from './redux-persit';
import { setisLoggedIn } from './redux-persit';
export const PopBar = () => {
    const router = useRouter();
    const isVerified = useAppSelector((state) => state.data.isLoggedIn);
    const dispatch = useAppDispatch();
    const isSeller = useAppSelector((state) => state.data.isUserSeller);


    const handleLogout = () => {
        dispatch(setToken(""));
        dispatch(setisLoggedIn(false));
        window.location.href = "/";
    }
    return (
        <div>
            <div className='flex flex-col '>
                <ul className='flex flex-col gap-2 bg-white p-5 '>
                    <li style={{ cursor: "pointer", padding: "5px" }} onClick={() => router.push("/login")}>Login / Register</li>
                    <li style={{ cursor: "pointer", padding: "5px" }} onClick={() => router.push("/settings")}>Settings</li>
                    <li style={{ cursor: "pointer", padding: "5px" }}>About Us</li>
                    {isVerified && <li style={{ cursor: "pointer", padding: "5px" }} onClick={() => router.push(`${isSeller ? "/sellerdashboard" : "seller"}`)}>{isSeller ? "Seller Dashboard" : "Become a Seller"}</li>}
                    <li style={{ cursor: "pointer", padding: "5px" }} onClick={() => handleLogout()}>Logout</li>


                </ul>

            </div>
        </div>
    )
}
