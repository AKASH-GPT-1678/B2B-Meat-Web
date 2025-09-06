import React from 'react';
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className="bg-white">
          
            <div className="w-full h-[10px] bg-black"></div>

    
            <div className="flex flex-col lg:flex-row justify-between px-10 lg:px-14 py-10">

              
                <div>
                    <p className="font-bold text-lg">Meat Truck</p>
                </div>

        
                <div className="flex flex-col md:flex-row gap-10 mt-6 lg:mt-0">
            
                    <ul className="space-y-2 cursor-pointer">
                        <li className="font-semibold text-xl">Community</li>
                        <li>About</li>
                        <li>Submit an Issue</li>
                        <li>GitHub Repo</li>
                        <li>Slack</li>
                    </ul>

                    <ul className="space-y-2 cursor-pointer">
                        <li className="font-semibold text-xl">Getting Started</li>
                        <li>Introduction</li>
                        <li>Documentation</li>
                        <li>Usage</li>
                        <li>Globals</li>
                        <li>Elements</li>
                        <li>Collections</li>
                        <li>Themes</li>
                    </ul>

                
                    <ul className="space-y-2 cursor-pointer">
                        <li className="font-semibold text-xl">Resources</li>
                        <li>API</li>
                        <li>Form Validations</li>
                        <li>Visibility</li>
                        <li>Accessibility</li>
                        <li>Community</li>
                        <li>Design Defined</li>
                        <li>Marketplace</li>
                    </ul>
                </div>
            </div>

   
            <div className="flex flex-col lg:flex-row justify-between items-center lg:px-14 py-5 border-t border-gray-200">

          
                <div>
                    <p className="text-gray-500 text-sm">@ 2023 All rights reserved</p>
                </div>

           
                <div className="flex flex-wrap justify-center space-x-7 text-sm font-medium text-gray-400 mt-4 lg:mt-0">
                    <p>Terms & Conditions</p>
                    <p>Privacy Policy</p>
                    <p>Security</p>
                    <p>Sitemap</p>
                </div>

              
                <div className="flex justify-center gap-6 mt-4 lg:mt-0 text-gray-500">
                    <FaGithub size={24} />
                    <FaTwitter size={24} />
                    <FaFacebookF size={24} />
                    <FaInstagram size={24} />
                </div>
            </div>
        </footer>
    )
}

export default Footer
