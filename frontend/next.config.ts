import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images : {
    remotePatterns : [
      {
        protocol : "https",
        hostname : "meat-bucket-2025.s3.ap-south-1.amazonaws.com",
       
      },
            {
        protocol : "https",
        hostname : "res.cloudinary.com",
       
      }
      
    ]
  }

};

export default nextConfig;
