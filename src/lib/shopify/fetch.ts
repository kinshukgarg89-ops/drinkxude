import { SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_API_VERSION, SHOPIFY_STOREFRONT_ACCESS_TOKEN } from "./config";

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<{ status: number; body: T }> {
  try {
    const result = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      // Using cache to improve performance as suggested by spec, but for carts we might need cache: "no-store".
      // We can let the caller handle the fetch options if needed, or default to standard.
      // Next.js handles fetch caching.
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (error) {
    console.error("Shopify Fetch Error:", error);
    throw error;
  }
}
