"use client";

import React from "react";
import { Navigation } from "@/components/navigation";
import { CustomCursor } from "@/components/custom-cursor";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { CartProvider } from "@/context/CartProvider";

export default function ShippingTermsPage() {
  return (
    <CartProvider>
      <main className="relative w-full bg-background text-foreground min-h-screen antialiased flex flex-col">
        <CustomCursor />
        <Navigation alwaysSticky />

        {/* Content Wrapper */}
        <div className="flex-1 w-full max-w-4xl mx-auto pt-40 pb-24 px-6 md:px-12">
          
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-12">
            Shipping Terms & Conditions
          </h1>

          <div className="flex flex-col space-y-8 text-base md:text-lg text-foreground opacity-80 leading-relaxed font-medium">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-foreground mb-4">
                Delivery Guidelines
              </h2>
              <ol className="list-decimal pl-6 space-y-4">
                <li>The logistics company will make a maximum of one attempt to deliver your package of Xude in case of unavailability.</li>
                <li>You are required to answer their calls and be available at the time of delivery communicated to you.</li>
                <li>In case of fake delivery, thorough investigation will be done, which will take 7-8 days to conclude on the next steps.</li>
              </ol>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-foreground mt-6 mb-4">
                Shipping Policies
              </h2>
              <ol className="list-decimal pl-6 space-y-4">
                <li>We offer FREE SHIPPING Pan India on all Pre-Paid orders. We do not accept cash-on-delivery.</li>
                <li>Xude Beverages will send tracking information via email within 72 hours of order confirmation.</li>
                <li>All orders are processed within 48-72 hours of receipt (business days). On Sundays and public holidays, orders are not processed or shipped.</li>
                <li>The estimated delivery time is 5-7 working days from order confirmation.</li>
                <li>If we receive a large number of orders, shipments may be delayed by a few days. Please allow for additional transit days for delivery. If there is going to be a significant delay in shipping your order, we will notify you via email or phone.</li>
                <li>We do not currently ship outside of India.</li>
                <li>The order will be delivered to the specified address in the order details. In case of change of address a nominal fee will be charged to revise the information and retry the delivery. No refund will be provided. To ensure a smooth delivery process, kindly mention the correct address/pin code at the time of placing the order.</li>
              </ol>
            </div>
          </div>

        </div>

        <Footer />
        <ScrollToTop />
      </main>
    </CartProvider>
  );
}
