'use client';
import React from 'react'
import { IoIosHome } from "react-icons/io";
import { ta } from 'zod/v4/locales';
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { FaProductHunt } from "react-icons/fa";
import { IoMdHelp } from "react-icons/io";
import { MdOutlineForwardToInbox } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { MdOutlineReportProblem } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import SellerProducts from '../Components/Sellerproducts';
import ProductForm from '../Components/Proudctform';
import { useAppDispatch , useAppSelector } from '@/utils/reduxhook';
const SellerDashboard = () => {

  const [active, setActive] = React.useState("dashboard");
        const dispatch = useAppDispatch();
        const token = useAppSelector((state) => state.data.token);


  const tabs = [
    {
      label: "Dashboard",
      key: "dashboard",
      icon: <IoIosHome size={30} fill={active === "dashboard" ? "#27BBF5" : "grey"} />,
    },
    {
      label: "Earnings",
      key: "earnings",
      icon: <RiMoneyRupeeCircleLine size={30} color={active === "earnings" ? "#27BBF5" : "grey"} />,
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

    <div className='flex flex-row'>


      <div className='p-4 w-full max-w-[400px]'>
        <h1 className="text-3xl font-handwriting font-extrabold ">Meat Truck</h1>


        <div className='mt-4 p-2'>
          <h1>Menu</h1>

          <div className="flex flex-col gap-4">
            {tabs.map((tab) => (
              <div
                key={tab.key}
                onClick={() => setActive(tab.key)}
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
        <SellerProducts/>

        <ProductForm/>
      </div>

    </div>
  )
}

export default SellerDashboard
