import { shopifyClient } from "../lib/shopify/client";
import { getProductsQuery, getProductByHandleQuery } from "../graphql/products";
import { ShopifyProduct } from "../types/shopify";

export async function getProducts(): Promise<ShopifyProduct[]> {
  try {
    const { body } = await shopifyClient.fetch<{ data: { products: { edges: { node: ShopifyProduct }[] } } }>({
      query: getProductsQuery,
    });
    return body.data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  try {
    const { body } = await shopifyClient.fetch<{ data: { product: ShopifyProduct } }>({
      query: getProductByHandleQuery,
      variables: { handle },
    });
    return body.data.product || null;
  } catch (error) {
    console.error(`Error fetching product ${handle}:`, error);
    return null;
  }
}
