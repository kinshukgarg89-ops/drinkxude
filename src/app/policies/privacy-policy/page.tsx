"use client";

import React from "react";
import { Navigation } from "@/components/navigation";
import { CustomCursor } from "@/components/custom-cursor";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { CartProvider } from "@/context/CartProvider";

export default function PoliciesPage() {
  return (
    <CartProvider>
      <main className="relative w-full bg-background text-foreground min-h-screen antialiased flex flex-col">
        <CustomCursor />
        <Navigation alwaysSticky />

        {/* Content Wrapper */}
        <div className="flex-1 w-full max-w-4xl mx-auto pt-40 pb-24 px-6 md:px-12">
          
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-12">
            Privacy Policy
          </h1>

          <div className="flex flex-col space-y-6 text-base md:text-lg text-foreground opacity-80 leading-relaxed font-medium">
            <p>
              All online payments on www.drinkxude.com are processed on a secure payment gateway. We do not store or have visibility into customers' net banking information or credit/debit card details as all payments are handled by a secure 3rd party gateway with world-class security.
            </p>
            <p>
              All the information provided to us by you, including sensitive personal information, is voluntary. You have the right to withdraw your consent at any time, in accordance with the terms of this User Agreement, but please note that withdrawal of consent will not be retroactive. You can access, modify, correct and eliminate the data about you which has been collected pursuant to your decision to become a user of the Website. If you update any information relating to you, we may keep a copy of the information which you originally provided to us in its archives.
            </p>
            <p>
              Due to the communications standards on the Internet, when you visit the Website, we automatically receive the URL of the site from which you came and the site to which you are going when you leave. We also receive the Internet Protocol (IP) address of your computer (or the proxy server you used to access the World Wide Web), your computer operating system and type of web browser you are using, email patterns, as well as the name of your internet service provider (ISP). This information is used to analyze overall trends to help us improve our service.
            </p>
            <p>
              The Website uses temporary cookies to store certain data (that is not sensitive personal data or information) that is used by us and our service providers for the technical administration of the Website, research and development, and for administration. In the course of serving advertisements or optimizing services to you, we may allow authorized third parties to place or recognize a unique cookie on your browser. We do not store personally identifiable information in the cookies.
            </p>
            <p>
              We may keep records of telephone calls received and made for making inquiries, orders or other purposes for the purpose of administration of services, research and development, quality management services and for proper administration.
            </p>
            <p>
              We do not allow other companies, to serve advertisements to you. We assume no responsibility, and shall not be liable for, any damages to, or viruses that may infect your equipment on account of you access to, use of, or browsing the Website or the downloading of any material, data, text, images, video content, or audio content from the Website. If you are dissatisfied with the Website, your sole remedy is to discontinue using the Website. This privacy policy applies to all websites, services and mobile applications that are operated and managed by us.
            </p>
            <p>
              We do not exercise control over the sites displayed as search results or links from within its services. These other sites may place their own cookies or other files on your computer, collect data or solicit personal information from you, for which we are not responsible or liable. Accordingly, we do not make any representations concerning the privacy practices or policies of such third parties or terms of use of such websites, nor do we guarantee the accuracy, integrity, or quality of the information, data, text, software, sound, photographs, graphics, videos, messages or other materials available on such websites. The inclusion or exclusion does not imply any endorsement by us of the website, the website's provider, or the information on the website. We encourage you to read the privacy policies of that website.
            </p>
            <p>
              The Website may enable you to communicate with other users or to post information to be accessed by others, whereupon other users may collect such data. We hereby expressly disclaim any liability for any misuse of such information that is made available by visitors in such a manner. We value the privacy of information pertaining to our associates. The linkage between your IP address and your personally identifiable information is not shared with third parties without your permission or except when required by law.
            </p>
            <p>
              We will enable you to communicate your privacy concerns to us and that we will respond to them appropriately. We do not disclose any personal information to advertisers and for other marketing and promotional purposes.
            </p>
            <p>
              We will use and share your data (Name, Email, Phone. No., Address, Order details) with our 3rd party partner in order to fulfil your order requirement.
            </p>
          </div>

        </div>

        <Footer />
        <ScrollToTop />
      </main>
    </CartProvider>
  );
}
