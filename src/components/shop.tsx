"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { CartDrawer } from "@/components/cart-drawer";
import { ASSETS } from "@/lib/assets";

const products = [
  {
    id: "lemon-mint",
    name: "Lemon Mint",
    tagline: "Crisp. Refreshing. Sharp.",
    description: "A bright citrus hit balanced with cool mint for instant refreshment.",
    price: 34.99,
    subtitle: "12-Pack",
    color: "#D4F46C",
    hoverText: "dark",
    gradient: ["#D4F46C", "#a8d648"],
    image: ASSETS.shop.products[0].image,
  },
  {
    id: "mango-passion",
    name: "Mango Passion",
    tagline: "Tropical. Smooth. Vibrant.",
    description: "Sun-ripe mango meets exotic passion fruit for a bold escape.",
    price: 34.99,
    subtitle: "12-Pack",
    color: "#F97316",
    hoverText: "dark",
    gradient: ["#F97316", "#EA580C"],
    image: ASSETS.shop.products[1].image,
  },
];

function ProductImage({ product, isDesktop }: { product: (typeof products)[0]; isDesktop?: boolean }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div
        className="w-full h-full max-h-[260px] aspect-[3/4]"
        style={{ backgroundColor: product.color }}
      />
    );
  }

  return (
    <motion.div
      className="relative w-full h-full max-h-[260px] aspect-[3/4]"
      whileHover={isDesktop ? { scale: 1.05 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 80vw, 40vw"
        onError={() => setImgError(true)}
      />
    </motion.div>
  );
}

function ProductCard({ product, idx, isDesktop }: { product: (typeof products)[0]; idx: number; isDesktop?: boolean }) {
  const { addItem, updateQty, items } = useCart();
  const isLightHover = product.hoverText === "light";
  const qty = items.find((i) => i.id === product.id)?.qty || 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      color: product.color,
      gradient: product.gradient,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: isDesktop ? 60 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: idx * (isDesktop ? 0.15 : 0.1) }}
      className="group"
    >
      <motion.div
        whileTap={isDesktop ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.35 }}
        style={{ "--product-color": product.color } as React.CSSProperties}
        className={`relative h-[420px] md:h-[520px] bg-white border border-black/10 p-5 md:p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl md:hover:bg-[var(--product-color)] md:hover:-translate-y-1.5 transition-all duration-500 ${
          isDesktop ? "" : ""
        }`}
      >
        {/* Image container - takes remaining height */}
        <div className="flex-1 min-h-0 relative flex items-center justify-center">
          <ProductImage product={product} isDesktop={isDesktop} />
        </div>

        {/* Product info */}
        <div className="mt-4 md:mt-6">
          <span
            className={`text-xs font-bold tracking-widest uppercase text-muted mb-1 block transition-colors duration-500 ${
              isLightHover ? "group-hover:text-white/70" : "group-hover:text-black/60"
            }`}
          >
            0{idx + 1} — {product.subtitle}
          </span>
          <h3
            className={`text-2xl md:text-3xl font-heading font-black tracking-tight mb-1 transition-colors duration-500 ${
              isLightHover ? "group-hover:text-white" : "group-hover:text-black"
            }`}
          >
            {product.name}
          </h3>
          <p
            className={`text-xs md:text-sm text-muted leading-relaxed transition-colors duration-500 ${
              isLightHover ? "group-hover:text-white/70" : "group-hover:text-black/60"
            }`}
          >
            {product.description}
          </p>
        </div>

        {/* Bottom: price + Add to Cart / stepper */}
        <div className="mt-auto pt-4 md:pt-6">
          <p
            className={`text-base md:text-lg font-bold mb-3 transition-colors duration-500 ${
              isLightHover ? "group-hover:text-white/90" : "group-hover:text-black/80"
            }`}
          >
            ${product.price.toFixed(2)}
          </p>
          {qty > 0 ? (
            <div className="w-full flex items-stretch border-2 border-foreground bg-white text-foreground text-sm font-bold tracking-wide overflow-hidden">
              <button
                onClick={() => updateQty(product.id, -1)}
                className="flex-1 py-3 md:py-4 hover:bg-black/5 active:bg-black/10 transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="flex-1 flex items-center justify-center py-3 md:py-4 border-x-2 border-foreground">
                {qty}
              </span>
              <button
                onClick={() => updateQty(product.id, 1)}
                className="flex-1 py-3 md:py-4 hover:bg-black/5 active:bg-black/10 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
              <button
                onClick={handleAddToCart}
                className="w-full py-3 md:py-4 text-sm font-bold tracking-wide flex items-center justify-center gap-2 border-2 border-foreground bg-white text-foreground transition-all duration-500 md:hover:scale-[1.02] group-hover:bg-foreground group-hover:text-background group-hover:border-foreground"
              >
              Add to Cart <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function MobileScrollRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:hidden -mx-4 px-4">
      <div className="flex gap-4 snap-scroll pb-6">
        {children}
      </div>
    </div>
  );
}

export function ShopSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const canY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <>
      <section
        id="shop-section"
        ref={sectionRef}
        className="relative w-full bg-background py-24 md:py-32 overflow-hidden md:snap-start"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-bold tracking-widest uppercase text-muted mb-4 block">
                Shop
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[1.05]">
                Stock up.
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg text-muted font-medium max-w-sm"
            >
              Pick your flavour and grab a 12-pack. Clean energy, delivered.
            </motion.p>
          </div>
        </div>

        {/* Mobile: Horizontal scroll with peek */}
        <MobileScrollRow>
          {products.map((product, idx) => (
            <div key={product.id} className="snap-start snap-always shrink-0 w-[72vw]">
              <ProductCard product={product} idx={idx} />
            </div>
          ))}
        </MobileScrollRow>

        {/* Desktop: Grid */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div style={{ y: canY }} className="grid grid-cols-2 gap-4">
            {products.map((product, idx) => (
              <ProductCard key={product.id} product={product} idx={idx} isDesktop />
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <motion.div
              transition={{ duration: 0.3 }}
              className="group bg-foreground text-background p-6 md:p-10 flex flex-col justify-between min-h-[200px] shadow-sm hover:shadow-2xl md:hover:-translate-y-1.5 transition-all duration-500 cursor-pointer"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-heading font-black tracking-tight mb-2">
                  Subscribe & Save 15%
                </h3>
                <p className="text-background/70 font-medium">
                  Never run out of energy. Free shipping, skip or cancel anytime.
                </p>
              </div>
              <button className="mt-6 self-start flex items-center gap-2 text-sm font-bold tracking-widest uppercase group-hover:gap-4 transition-all">
                Learn More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
            <motion.div
              transition={{ duration: 0.3 }}
              className="group bg-white border border-black/10 p-6 md:p-10 flex flex-col justify-between min-h-[200px] shadow-sm hover:shadow-2xl hover:border-foreground/30 md:hover:-translate-y-1.5 transition-all duration-500 cursor-pointer"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-heading font-black tracking-tight mb-2">
                  Free Shipping
                </h3>
                <p className="text-muted font-medium">
                  On all orders over $50. Delivered cold and ready to crack open.
                </p>
              </div>
              <button className="mt-6 self-start flex items-center gap-2 text-sm font-bold tracking-widest uppercase group-hover:gap-4 transition-all">
                Shop Now <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CartDrawer />
    </>
  );
}
