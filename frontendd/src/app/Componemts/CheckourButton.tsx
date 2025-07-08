"use client";
import React from "react";
import { useState } from "react";
import { createOrderId } from "./OrderId";
import axios from "axios";
import Script from "next/script";

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [price, setprice] = React.useState(100);

  const handlePayment = async () => {
    try {
      const orderId = await createOrderId(price, "INR");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: price * 100,
        currency: "INR",
        name: "Gupta Company",
        order_id: orderId,
        handler: async function (response: any) {
          try {
            const paymentResponse = await axios.post("/api/verifyOrder", {
              razorpay_order_id: orderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert("Payment Successful!");
            console.log(paymentResponse.data);
          } catch (error) {
            alert("Payment verification failed. Please contact support.");
            console.error(error);
          }
        },
        prefill: {
          name: "YOUR_NAME",
          email: "acashgupta960@gmail.com", 
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.on("payment.failed", function (response: any) {
        alert("Payment failed");
        console.error(response.error);
      });
      razorpay.open();
    } catch (error) {
      console.error("Payment initiation failed", error);
    }
  };

   return (
    <>
      <button
        className="bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl hover:bg-emerald-600 transition-all duration-300 hover:shadow-lg hover:scale-105"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Buy Now"}
      </button>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
    </>
  );
  
}


