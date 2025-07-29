import React from 'react'
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
export const PopBar = () => {
    const router = useRouter()
    return (
        <div>
            <div className='flex flex-col '>
                <ul className='flex flex-col gap-2 bg-white p-5 '>
                    <li style={{ cursor: "pointer", padding: "5px" }} onClick={() => router.push("/login")}>Login / Register</li>
                    <li style={{ cursor: "pointer", padding: "5px" }}>Settings</li>
                    <li style={{ cursor: "pointer", padding: "5px" }}>About Us</li>
                    <li style={{ cursor: "pointer", padding: "5px" }} onClick={() => router.push("/seller")}>Seller</li>
                    <li style={{ cursor: "pointer", padding: "5px" }} onClick={() => signOut()}>Logout</li>


                </ul>

            </div>
        </div>
    )
}
