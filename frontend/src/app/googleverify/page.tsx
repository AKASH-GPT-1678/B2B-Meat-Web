"use client";
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { p } from 'framer-motion/client';
import { useSearchParams } from 'next/navigation';
const GoogleVerification = () => {

    const { data: session, status } = useSession();
    const searchparam = useSearchParams();


    const state = searchparam.get("google")
    useEffect(() => {
        const state = searchparam.get("google");
        if (!state) {
            window.location.href = "/";
        }

    }, []);


    return (
        <div>
            <h1>{JSON.stringify(session?.user)}</h1>
            <p>{session?.expires}</p>
            <h1>{state}</h1>
            {status}
        </div>
    )
}

export default GoogleVerification
