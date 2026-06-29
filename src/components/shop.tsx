"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, X, ArrowRight } from "lucide-react";
import { useCart } from "@/components/cart-provider";

const products = [
  {
    id: "lemon-mint",
    name: "Lemon Mint",
    price: 34.99,
    subtitle: "12-Pack",
    color: "#D4F46C",
    gradient: ["#D4F46C", "#a8d648"],
    hoverText: "dark",
  },
  {
    id: "mango-passion",
    name: "Mango Passion",
    price: 34.99,
    subtitle: "12-Pack",
    color: "#F97316",
    gradient: ["#F97316", "#EA580C"],
    hoverText: "dark",
  },
];

function CanVisual({ gradient }: { gradient: string[] }) {
  return (
    <svg viewBox="0 0 120 260" className="w-full h-full drop-shadow-xl">
      <defs>
        <linearGradient id={`shopCan-${gradient[0].replace("#", "")}`} x1="0" y1="0" x2="120" y2="260">
          <stop offset="0%" stopColor={gradient[0]} />
          <stop offset="60%" stopColor={gradient[1]} />
          <stop offset="100%" stopColor={gradient[0]} />
        </linearGradient>
        <linearGradient id={`shopMetal-${gradient[0].replace("#", "")}`} x1="0" y1="0" x2="120" y2="0">
          <stop offset="0%" stopColor="#9ca3af" />
          <stop offset="50%" stopColor="#e5e7eb" />
          <stop offset="100%" stopColor="#9ca3af" />
        </linearGradient>
      </defs>
      <path
        d="M20 30 C20 15 35 8 60 8 C85 8 100 15 100 30 L100 230 C100 245 85 252 60 252 C35 252 20 245 20 230 Z"
        fill={`url(#shopCan-${gradient[0].replace("#", "")})`}
      />
      <path
        d="M20 30 C20 42 35 50 60 50 C85 50 100 42 100 30 C100 18 85 10 60 10 C35 10 20 18 20 30 Z"
        fill={`url(#shopMetal-${gradient[0].replace("#", "")})`}
      />
      <path
        d="M20 230 C20 242 35 250 60 250 C85 250 100 242 100 230 C100 218 85 210 60 210 C35 210 20 218 20 230 Z"
        fill={`url(#shopMetal-${gradient[0].replace("#", "")})`}
      />
      <rect x="28" y="55" width="64" height="150" rx="2" fill="rgba(0,0,0,0.06)" />
      <text
        x="60"
        y="140"
        textAnchor="middle"
        fill="rgba(0,0,0,0.8)"
        fontSize="14"
        fontWeight="900"
        fontFamily="var(--font-dm-sans), sans-serif"
        letterSpacing="1"
      >
        XUDE
      </text>
    </svg>
  );
}

function ProductCard({ product, idx, isDesktop }: { product: (typeof products)[0]; idx: number; isDesktop?: boolean }) {
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const isLightHover = product.hoverText === "light";

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      color: product.color,
      gradient: product.gradient,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
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
        whileHover={{ backgroundColor: product.color, y: isDesktop ? -6 : 0 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.35 }}
        className="relative h-[520px] md:h-[600px] bg-white border border-black/10 p-5 md:p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
      >
        <motion.div
          className="absolute top-[42%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-48 md:w-40 md:h-80"
          whileHover={{ scale: 1.08, rotate: 3 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <CanVisual gradient={product.gradient} />
        </motion.div>

        <div>
          <p
            className={`text-xs font-bold tracking-widest uppercase mb-1 transition-colors duration-500 ${
              isLightHover ? "group-hover:text-white/70" : "group-hover:text-black/60"
            }`}
          >
            {product.subtitle}
          </p>
          <h3
            className={`text-3xl md:text-4xl font-heading font-black tracking-tight mb-1 transition-colors duration-500 ${
              isLightHover ? "group-hover:text-white" : "group-hover:text-black"
            }`}
          >
            {product.name}
          </h3>
          <p
            className={`text-sm md:text-base font-bold transition-colors duration-500 ${
              isLightHover ? "group-hover:text-white/90" : "group-hover:text-black/80"
            }`}
          >
            ${product.price.toFixed(2)}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full py-3 md:py-4 text-sm font-bold tracking-wide flex items-center justify-center gap-2 border-2 border-foreground bg-white text-foreground transition-all duration-500 hover:scale-[1.02] group-hover:bg-foreground group-hover:text-background group-hover:border-foreground"
        >
          {addedId === product.id ? (
            "Added"
          ) : (
            <>
              Add to Cart <Plus className="w-4 h-4" />
            </>
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}

export function ShopSection() {
  const { items, total, count, isOpen, setIsOpen, updateQty } = useCart();

  return (
    <>
      <section id="shop-section" className="relative w-full bg-[#fafafa] py-24 md:py-32 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
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
          </div>

          {/* Mobile: Horizontal scroll with peek */}
          <div className="md:hidden pl-4 pr-0">
            <div className="flex gap-4 snap-scroll pb-6">
              {products.map((product, idx) => (
                <div key={product.id} className="snap-start shrink-0 w-[72vw]">
                  <ProductCard product={product} idx={idx} />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              {products.map((product, idx) => (
                <ProductCard key={product.id} product={product} idx={idx} isDesktop />
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group bg-foreground text-background p-6 md:p-10 flex flex-col justify-between min-h-[200px] shadow-sm hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
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
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group bg-white border border-black/10 p-6 md:p-10 flex flex-col justify-between min-h-[200px] shadow-sm hover:shadow-2xl hover:border-foreground/30 transition-all duration-500 cursor-pointer"
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

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[420px] bg-background z-[70] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-black/10">
                <h3 className="text-2xl font-heading font-black tracking-tight">Your Cart ({count})</h3>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 transition-colors rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <p className="text-muted font-medium">Your cart is empty.</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 border border-black/10 bg-white hover:border-foreground/30 transition-colors"
                    >
                      <div
                        className="w-16 h-20 shrink-0"
                        style={{ backgroundColor: item.color }}
                      >
                        <CanVisual gradient={item.gradient} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold">{item.name}</h4>
                        <p className="text-sm text-muted">{item.subtitle}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="p-1 hover:bg-black/5 transition-colors rounded-full"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold w-6 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="p-1 hover:bg-black/5 transition-colors rounded-full"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="font-bold">
                        ${(item.price * item.qty).toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="p-6 border-t border-black/10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-muted font-medium">Total</span>
                    <span className="text-3xl font-heading font-black">${total.toFixed(2)}</span>
                  </div>
                  <button className="w-full py-4 bg-foreground text-background font-bold tracking-wide hover:bg-foreground/85 hover:scale-[1.01] transition-all">
                    Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
