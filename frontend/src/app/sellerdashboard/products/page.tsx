'use client'
import React from 'react';

import { FaProductHunt } from "react-icons/fa";
import { IoMdHelp } from "react-icons/io";
import { MdOutlineForwardToInbox } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { MdOutlineReportProblem } from "react-icons/md";
import { IoIosHome } from 'react-icons/io';
import { IoSettingsSharp } from "react-icons/io5";
import { FaBlog } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import ProductsGrid from '@/app/appcomponents/ProductCard';
import { useAppSelector , useAppDispatch } from '@/utils/reduxhook';
import ProductForm from '@/app/forms/Proudctform';
import axios from 'axios';
import { Product } from '@/app/appcomponents/DisplayProd';
const exampleBlog = {
    title: "How to Build a Responsive Blog Card in React",
    thumbnail: "https://res.cloudinary.com/dffepahvl/image/upload/v1753692201/bl0l2nbqq3m4ydwjcrxu.jpg",
    summary: "A step-by-step guide to building a mobile-first blog card layout using Tailwind CSS.",
    author: "John Doe",
    date: "2025-07-29"
};
const ProductsPage = () => {

    const [active, setActive] = React.useState("products");
    const [showForm, setShowForm] = React.useState(false);
    const [allProducts, setAllProducts] = React.useState<Product[]>([]);
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.data.token);
    const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;

    const handleActivity = (key: string, route: string) => {
        setActive(key);
        if (route) {
            window.location.href = route;
        }

    };

    const getMyProducts = async () => {
        console.log(token);


        try {
            const response = await axios.get(`${endpoint}/product/myLivestock`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response.data);
            setAllProducts(response.data);
            return response.data;
            

        } catch (error) {
            console.error(error);

        }
    };



    React.useEffect(() => {
        getMyProducts();
    }, []);





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


            <div className='flex flex-row'>


                <div className='p-4 w-full max-w-[300px] border-2'>
                    <h1 className="text-3xl font-handwriting font-extrabold " onClick={() => handleActivity("", "/")}>Meat Truck</h1>


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

                <div className='p-4 w-full relative'>


                    <div className="p-4 flex flex-col gap-10">

                        <div className="w-full h-[100px]">
                            <Button className="h-[50px] cursor-pointer" onClick={() => setShowForm(!showForm)}>Upload New Product</Button>


                        </div>


                        <div>
                        
                             <ProductsGrid allProducts={allProducts} />
                        </div>


                        <div>
                            <h2 className="text-xl font-bold mb-4">Your Active Products (Live on Website)</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="border p-4 rounded-md">Active Product 1</div>
                                <div className="border p-4 rounded-md">Active Product 2</div>
                                <div className="border p-4 rounded-md">Active Product 3</div>
                            </div>
                        </div>


                        <div>
                            <h2 className="text-xl font-bold mb-4">Top Rated Products</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="border p-4 rounded-md">Top Rated Product 1</div>
                                <div className="border p-4 rounded-md">Top Rated Product 2</div>
                                <div className="border p-4 rounded-md">Top Rated Product 3</div>
                            </div>
                        </div>

                    </div>


                    {showForm &&
                        <div className='absolute top-20 left-1/4 z-40'>
                            <ProductForm />

                        </div>


                    }




                </div>

                <div>



                </div>

            </div>
        </div>
    )
}

export default ProductsPage;
