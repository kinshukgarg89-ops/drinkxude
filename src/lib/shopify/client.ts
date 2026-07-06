import { shopifyFetch } from "./fetch";
import { SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_API_VERSION } from "./config";

export const shopifyClient = {
  fetch: shopifyFetch,
  domain: SHOPIFY_STORE_DOMAIN,
  apiVersion: SHOPIFY_STOREFRONT_API_VERSION,
};
