import type { NextConfig } from "next";

const nextConfig: NextConfig = {

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
//"https://meatbuckett.s3.eu-north-1.amazonaws.com/andhra prawns.jpg"


export default nextConfig;
