import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images : {
    remotePatterns : [
      {
        protocol : "https",
        hostname : "meatbuckett.s3.eu-north-1.amazonaws.com",
       
      },
            {
        protocol : "https",
        hostname : "res.cloudinary.com",
       
      }
      
    ]
  }

};



export default nextConfig;
