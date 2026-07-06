import { useState, useEffect, useCallback, useMemo } from 'react';
import { getCart, createCart, addToCart, updateCartLines, removeCartLines } from '../services/cart.service';
import { ShopifyCart } from '../types/shopify';

const CART_ID_KEY = 'xude_cart_id';

export function useShopifyCart() {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initializeCart() {
      setIsLoading(true);
      const savedCartId = localStorage.getItem(CART_ID_KEY);
      
      if (savedCartId) {
        const existingCart = await getCart(savedCartId);
        if (existingCart) {
          setCart(existingCart);
          setIsLoading(false);
          return;
        }
      }

      // If no saved cart or it's invalid/expired, create a new one
      const newCart = await createCart();
      if (newCart) {
        localStorage.setItem(CART_ID_KEY, newCart.id);
        setCart(newCart);
      }
      setIsLoading(false);
    }

    initializeCart();
  }, []);

  const addItem = useCallback(async (variantId: string, quantity: number = 1) => {
    let currentCartId = cart?.id;
    
    if (!currentCartId) {
      const newCart = await createCart();
      if (newCart) {
        localStorage.setItem(CART_ID_KEY, newCart.id);
        currentCartId = newCart.id;
        setCart(newCart);
      } else {
        return; // handle error appropriately
      }
    }

    // Call Shopify Add to Cart
    try {
      const updatedCart = await addToCart(currentCartId, [{ merchandiseId: variantId, quantity }]);
      if (updatedCart) {
        setCart(updatedCart);
        // setIsOpen(true); Removed as requested by user
      }
    } catch (error) {
      // If error occurs (e.g. cart invalid), create new cart and retry
      console.warn("Retrying with new cart due to error:", error);
      const newCart = await createCart();
      if (newCart) {
        localStorage.setItem(CART_ID_KEY, newCart.id);
        setCart(newCart);
        const updatedCart = await addToCart(newCart.id, [{ merchandiseId: variantId, quantity }]);
        if (updatedCart) setCart(updatedCart);
      }
    }
  }, [cart]);

  const updateLineQty = useCallback(async (lineId: string, quantity: number) => {
    if (!cart?.id) return;
    
    const previousCart = cart;
    try {
      // Optimistic update
      setCart({
        ...previousCart,
        lines: {
          ...previousCart.lines,
          edges: previousCart.lines.edges.map(e => 
             e.node.id === lineId ? { ...e, node: { ...e.node, quantity: quantity } } : e
          ).filter(e => e.node.quantity > 0)
        }
      });

      if (quantity <= 0) {
        const updatedCart = await removeCartLines(previousCart.id, [lineId]);
        if (updatedCart) setCart(updatedCart);
      } else {
        const updatedCart = await updateCartLines(previousCart.id, [{ id: lineId, quantity }]);
        if (updatedCart) setCart(updatedCart);
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
      setCart(previousCart); // rollback
    }
  }, [cart]);

  const removeLine = useCallback(async (lineId: string) => {
    if (!cart?.id) return;
    try {
      const updatedCart = await removeCartLines(cart.id, [lineId]);
      if (updatedCart) setCart(updatedCart);
    } catch (error) {
      console.error("Failed to remove line:", error);
    }
  }, [cart]);

  return {
    cart,
    isLoading,
    isOpen,
    setIsOpen,
    addItem,
    updateLineQty,
    removeLine
  };
}
