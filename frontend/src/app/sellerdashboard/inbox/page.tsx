'use client'
import React from 'react';
import { FaProductHunt } from "react-icons/fa";
import { IoMdHelp } from "react-icons/io";
import { MdOutlineForwardToInbox } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { MdOutlineReportProblem } from "react-icons/md";
import { IoIosHome } from 'react-icons/io';
import { IoSettingsSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { FaBlog } from "react-icons/fa";
import ChatBox from '@/app/appcomponents/ChatBox';

const InBoxPage = () => {

    const [active, setActive] = React.useState("inbox");
    const router = useRouter();
    const handleActivity = (key: string, route: string) => {
        setActive(key);
        if (route) {
            window.location.href = route;
        }

    }





    const tabs = [
        {
            label: "Dashboard",
            key: "",
            icon: <IoIosHome size={30} fill={active === "dashboard" ? "#27BBF5" : "grey"} />,
        },
        {
            label: "Blogs",
            key: "blogs",
            icon: <FaBlog size={30} color={active === "blogs" ? "#27BBF5" : "grey"} />,
        },
        {
            label: "My Products",
            key: "products",
            icon: <FaProductHunt size={30} color={active === "products" ? "#27BBF5" : "grey"} />,
        },
        {
            label: "Inbox",
            key: "inbox",
            icon: <MdOutlineForwardToInbox size={30} color={active === "inbox" ? "#27BBF5" : "grey"} />,
        },
        {
            label: "Settings",
            key: "settings",
            icon: <IoSettingsSharp size={30} color={active === "settings" ? "#27BBF5" : "grey"} />,
        },
        {
            label: "Report Issue",
            key: "report",
            icon: <MdOutlineReportProblem size={30} color={active === "report" ? "#27BBF5" : "grey"} />,
        },
        {
            label: "Help",
            key: "help",
            icon: <IoMdHelp size={30} color={active === "help" ? "#27BBF5" : "grey"} />,
        },
        {
            label: "Logout",
            key: "logout",
            icon: <MdLogout size={30} color={active === "logout" ? "#27BBF5" : "grey"} />,
        },
    ];
    
    return (
        <div className='relative'>
            <div className='flex flex-row w-full'>


                <div className='p-4 w-full max-w-[400px]'>
                    <h1 className="text-3xl font-handwriting font-extrabold " onClick={() => router.push('/')}>Meat Truck</h1>


                    <div className='mt-4 p-2'>
                 

                        <div className="flex flex-col gap-4">
                            {tabs.map((tab) => (
                                <div
                                    key={tab.key}
                                    onClick={() => handleActivity(tab.key, `/sellerdashboard/${tab.key}`)}
                                    className={`flex flex-row gap-4 p-2 rounded-2xl max-w-[200px] items-center 
                                cursor-pointer
          ${active === tab.key ? 'bg-blue-100' : 'bg-white'}`}
                                >
                                    {tab.icon}
                                    <p className={`font-bold ${active === tab.key ? 'text-blue-500' : 'text-gray-500'}`}>
                                        {tab.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>

                <div>
                    <ChatBox/>



                </div>

            </div>
        </div>
    )
}

export default InBoxPage;
