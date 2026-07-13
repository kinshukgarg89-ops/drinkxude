"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartProvider";
import { useProducts, MappedProduct } from "@/hooks/useProducts";
import { CartDrawer } from "@/components/cart-drawer";

function ProductImage({ product, isDesktop }: { product: MappedProduct; isDesktop?: boolean }) {
  const [imgError, setImgError] = useState(false);

  if (imgError || !product.image) {
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

function ProductCard({ product, idx, isDesktop }: { product: MappedProduct; idx: number; isDesktop?: boolean }) {
  const { addItem, updateQty, items } = useCart();

  const [selectedVariantId, setSelectedVariantId] = useState<string>(product.variantId);
  const [isAdding, setIsAdding] = useState(false);
  const cartItem = items.find((i) => i.variantId === selectedVariantId);
  const qty = cartItem?.qty || 0;

  const handleAddToCart = async () => {
    if (selectedVariantId) {
      setIsAdding(true);
      await addItem(selectedVariantId, 1);
      setIsAdding(false);
    }
  };

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
  const displayPrice = selectedVariant ? selectedVariant.price : product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: isDesktop ? 60 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: idx * (isDesktop ? 0.15 : 0.1) }}
      className="group h-full"
    >
      <motion.div
        whileTap={isDesktop ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.35 }}
        style={{ "--product-color": product.color } as React.CSSProperties}
        className={`relative h-full min-h-[520px] md:min-h-[600px] bg-white border border-black/10 p-5 md:p-8 flex flex-col overflow-hidden shadow-sm hover:shadow-xl md:hover:-translate-y-1.5 transition-all duration-500`}
      >
        {/* Fixed height image container */}
        <div className="h-[220px] md:h-[260px] shrink-0 relative flex items-center justify-center">
          <ProductImage product={product} isDesktop={isDesktop} />
        </div>

        {/* Product info - takes up available space */}
        <div className="mt-4 md:mt-6 flex-grow">
          <span className="text-xs font-bold tracking-widest uppercase text-muted mb-1 block">
            0{idx + 1}
          </span>
          <h3 className="text-2xl md:text-3xl font-heading font-black tracking-tight mb-1 text-black">
            {product.name}
          </h3>
          <p className="text-xs md:text-sm text-muted leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Bottom: Variant Picker, Price + Add to Cart / stepper */}
        <div className="mt-auto pt-4 md:pt-6 flex flex-col gap-3 shrink-0">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-base md:text-lg font-bold text-black/90">
                ₹{displayPrice.toFixed(2)}
              </p>
            </div>
            {product.variants.length > 1 && (
              <select
                aria-label={`Select variant for ${product.name}`}
                value={selectedVariantId}
                onChange={(e) => setSelectedVariantId(e.target.value)}
                className="text-sm font-medium border border-black/10 bg-black/5 rounded-md px-2 py-1 outline-none transition-colors duration-500 group-hover:bg-black/10 group-hover:border-black/20"
              >
                {product.variants.map(v => (
                  <option key={v.id} value={v.id} className="text-black bg-white">
                    {v.title}
                  </option>
                ))}
              </select>
            )}
          </div>

          {qty > 0 && cartItem ? (
            <div className="w-full flex items-stretch border-2 border-foreground bg-white text-foreground text-sm font-bold tracking-wide overflow-hidden">
              <button
                onClick={() => updateQty(cartItem.id, -1)}
                className="flex-1 py-3 md:py-4 hover:bg-black/5 active:bg-black/10 transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="flex-1 flex items-center justify-center py-3 md:py-4 border-x-2 border-foreground">
                {qty}
              </span>
              <button
                onClick={() => updateQty(cartItem.id, 1)}
                className="flex-1 py-3 md:py-4 hover:bg-black/5 active:bg-black/10 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale || isAdding}
              className="w-full py-3 md:py-4 text-sm font-bold tracking-wide flex items-center justify-center gap-2 border-2 border-foreground bg-white text-foreground transition-all duration-500 md:hover:scale-[1.02] group-hover:bg-foreground group-hover:text-background group-hover:border-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? (
                "Adding..."
              ) : selectedVariant?.availableForSale ? (
                <>Add to Cart <Plus className="w-4 h-4" /></>
              ) : (
                "Out of Stock"
              )}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function MobileScrollRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:hidden w-full">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-6 before:content-[''] before:shrink-0 before:w-0 sm:before:w-2 after:content-[''] after:shrink-0 after:w-0 sm:after:w-2">
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
  const { products, isLoading } = useProducts();

  let desktopGridClass = "grid-cols-2 max-w-[1200px] mx-auto";
  if (products.length === 1) {
    desktopGridClass = "grid-cols-1 max-w-[600px] mx-auto";
  } else if (products.length === 3) {
    desktopGridClass = "grid-cols-3";
  } else if (products.length >= 4) {
    desktopGridClass = "grid-cols-4";
  }

  return (
    <>
      <section
        id="shop-section"
        ref={sectionRef}
        className="relative w-full bg-background pt-24 pb-8 md:pt-32 md:pb-12 overflow-hidden"
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
              Pick your flavour and grab a pack.
            </motion.p>
          </div>
        </div>

        {isLoading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20 text-center font-bold text-muted">
            Loading products...
          </div>
        ) : (
          <>
            {/* Mobile: Horizontal scroll with peek */}
            <MobileScrollRow>
              {products.map((product, idx) => (
                <div key={product.id} className="shrink-0 w-[72vw]">
                  <ProductCard product={product} idx={idx} />
                </div>
              ))}
            </MobileScrollRow>

            {/* Desktop: Grid */}
            <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
              <motion.div style={{ y: canY }} className={`grid gap-4 ${desktopGridClass}`}>
                {products.map((product, idx) => (
                  <ProductCard key={product.id} product={product} idx={idx} isDesktop />
                ))}
              </motion.div>
            </div>
          </>
        )}

      </section>

      <CartDrawer />
    </>
  );
}
