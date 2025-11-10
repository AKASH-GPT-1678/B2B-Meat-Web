import React from 'react'
import { useRouter } from 'next/navigation';
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
    };
    
    return (
        <div>
            <div className='flex flex-col  '>
                <ul className='flex flex-col gap-2 bg-white p-5 border-2 border-gray-200 rounded-2xl '>

                    <li style={{ cursor: "pointer", paddingInline: "5px", fontWeight: "bold" }} onClick={() => router.push("/settings")}>Settings   / Upgrade     </li>
                    <li style={{ cursor: "pointer", padding: "5px", fontWeight: "bold" }} onClick={() => router.push("/chat")}>Chats</li>
                    <li style={{ cursor: "pointer", padding: "5px", fontWeight: "bold" }}>About Us</li>
                    {isVerified && <li style={{ cursor: "pointer", padding: "5px", fontWeight: "bold" }} onClick={() => router.push(`${isSeller ? "/sellerdashboard" : "seller"}`)}>{isSeller ? "Seller Dashboard" : "Become a Seller"}</li>}
                    <li style={{ cursor: "pointer", padding: "5px", fontWeight: "bold" }} onClick={() => handleLogout()}>Logout</li>


                </ul>

            </div>
        </div>
    )
}
