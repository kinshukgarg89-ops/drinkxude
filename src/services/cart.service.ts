import { shopifyClient } from "../lib/shopify/client";
import { 
  getCartQuery, 
  createCartMutation, 
  addToCartMutation, 
  updateCartLinesMutation, 
  removeCartLinesMutation 
} from "../graphql/cart";
import { ShopifyCart } from "../types/shopify";

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  try {
    const { body } = await shopifyClient.fetch<{ data: { cart: ShopifyCart } }>({
      query: getCartQuery,
      variables: { cartId },
    });
    return body.data.cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
}

export async function createCart(): Promise<ShopifyCart | null> {
  try {
    const { body } = await shopifyClient.fetch<{ data: { cartCreate: { cart: ShopifyCart, userErrors: any[] } } }>({
      query: createCartMutation,
      variables: { input: {} },
    });
    if (body.data.cartCreate.userErrors?.length) {
      throw new Error(body.data.cartCreate.userErrors[0].message);
    }
    return body.data.cartCreate.cart;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<ShopifyCart | null> {
  try {
    const { body } = await shopifyClient.fetch<{ data: { cartLinesAdd: { cart: ShopifyCart, userErrors: any[] } } }>({
      query: addToCartMutation,
      variables: { cartId, lines },
    });
    if (body.data.cartLinesAdd.userErrors?.length) {
      throw new Error(body.data.cartLinesAdd.userErrors[0].message);
    }
    return body.data.cartLinesAdd.cart;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
}

export async function updateCartLines(cartId: string, lines: { id: string; quantity: number }[]): Promise<ShopifyCart | null> {
  try {
    const { body } = await shopifyClient.fetch<{ data: { cartLinesUpdate: { cart: ShopifyCart, userErrors: any[] } } }>({
      query: updateCartLinesMutation,
      variables: { cartId, lines },
    });
    if (body.data.cartLinesUpdate.userErrors?.length) {
      throw new Error(body.data.cartLinesUpdate.userErrors[0].message);
    }
    return body.data.cartLinesUpdate.cart;
  } catch (error) {
    console.error("Error updating cart lines:", error);
    throw error;
  }
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<ShopifyCart | null> {
  try {
    const { body } = await shopifyClient.fetch<{ data: { cartLinesRemove: { cart: ShopifyCart, userErrors: any[] } } }>({
      query: removeCartLinesMutation,
      variables: { cartId, lineIds },
    });
    if (body.data.cartLinesRemove.userErrors?.length) {
      throw new Error(body.data.cartLinesRemove.userErrors[0].message);
    }
    return body.data.cartLinesRemove.cart;
  } catch (error) {
    console.error("Error removing cart lines:", error);
    throw error;
  }
}
