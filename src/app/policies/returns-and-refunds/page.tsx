"use client";

import React from "react";
import { Navigation } from "@/components/navigation";
import { CustomCursor } from "@/components/custom-cursor";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { CartProvider } from "@/context/CartProvider";

export default function ReturnsPage() {
  return (
    <CartProvider>
      <main className="relative w-full bg-background text-foreground min-h-screen antialiased flex flex-col">
        <CustomCursor />
        <Navigation alwaysSticky />

        {/* Content Wrapper */}
        <div className="flex-1 w-full max-w-4xl mx-auto pt-40 pb-24 px-6 md:px-12">
          
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-12">
            Return And Refund
          </h1>

          <div className="flex flex-col space-y-6 text-base md:text-lg text-foreground opacity-80 leading-relaxed font-medium">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-foreground mt-4 mb-2">
              Return
            </h2>
            <p>
              Return Request will be accepted only in case the product(s) received by the buyer is/are in damaged condition.
            </p>
            <p>
              Buyer has to write to us at <a href="mailto:contact@xudeenergy.com" className="font-bold underline hover:opacity-70 transition-opacity">contact@xudeenergy.com</a> within 24 hrs of receipt of the goods at his/her shipping address:
            </p>
            <ul className="list-disc pl-8 space-y-2">
              <li>Mention the Order no</li>
              <li>Reason to return</li>
              <li>Pictures of the damaged products.</li>
            </ul>
            <p>
              The products must be unused, untampered with and in the same condition they were delivered in.
            </p>
            <p>
              All products must be in their original packaging.
            </p>
            <p>
              All products must have a receipt or proof of purchase.
            </p>
            <p>
              Our team will then arrange for a reverse pick up.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-foreground mt-8 mb-2">
              Refunds
            </h2>
            <p>
              The returned products will be inspected and a notification will be sent to the buyer, confirming that we have received the products. Immediately after inspection, a second notification will be sent regarding the status of the refund.
            </p>
            <p>
              If the return is approved, we will initiate a refund to the buyer's original method of payment.
            </p>
            <p>
              The credit will be received within a certain amount of days.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-foreground mt-8 mb-2">
              Exchanges
            </h2>
            <p>
              We don't do Exchanges. Returns only.
            </p>
          </div>

        </div>

        <Footer />
        <ScrollToTop />
      </main>
    </CartProvider>
  );
}
