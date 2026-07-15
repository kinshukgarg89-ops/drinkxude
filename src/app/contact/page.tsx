"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { CartProvider } from "@/context/CartProvider";
import { CartDrawer } from "@/components/cart-drawer";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const subject = formData.get("subject")?.toString() || "Contact from Website";
    const message = formData.get("message")?.toString() || "";
    
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    
    window.location.href = `mailto:contact@xudeenergy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setStatus("success");
    (e.target as HTMLFormElement).reset();
    
    setTimeout(() => {
      setStatus("idle");
    }, 5000);
  };

  return (
    <CartProvider>
      <main className="relative w-full bg-background text-foreground min-h-screen antialiased flex flex-col">
        <Navigation alwaysSticky />
        <CartDrawer />

        {/* Content Wrapper */}
        <div className="flex-1 w-full max-w-3xl mx-auto pt-40 pb-24 px-6 md:px-12 flex flex-col items-center">
          
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-4 text-center">
            Contact Us
          </h1>
          <p className="text-foreground/60 text-lg md:text-xl text-center mb-12 max-w-lg">
            Have questions about your order or our energy drink? Drop us a line and we&apos;ll get back to you shortly.
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-foreground/80">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full bg-transparent border-b border-foreground/30 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-foreground/80">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full bg-transparent border-b border-foreground/30 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-bold uppercase tracking-wider text-foreground/80">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                required
                className="w-full bg-transparent border-b border-foreground/30 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors"
                placeholder="Order Issue / General Question"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold uppercase tracking-wider text-foreground/80">Message</label>
              <textarea
                name="message"
                id="message"
                required
                rows={5}
                className="w-full bg-transparent border-b border-foreground/30 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors resize-none"
                placeholder="How can we help you today?"
              ></textarea>
            </div>

            {/* Custom Web3Forms subjects and redirects can be controlled via hidden inputs */}
            <input type="hidden" name="from_name" value="Xude Energy Website" />
            
            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="w-full md:w-auto px-10 py-4 bg-foreground text-background font-bold tracking-widest uppercase hover:bg-foreground/80 transition-colors disabled:opacity-50 mt-8"
            >
              {status === "idle" && "Send Message"}
              {status === "submitting" && "Sending..."}
              {status === "success" && "Message Sent!"}
              {status === "error" && "Error! Try Again"}
            </button>

            {status === "success" && (
              <p className="text-green-600 font-medium text-center mt-4">
                Thank you! We have received your message and will reply soon.
              </p>
            )}
          </form>

        </div>

        <Footer />
        <ScrollToTop />
      </main>
    </CartProvider>
  );
}
