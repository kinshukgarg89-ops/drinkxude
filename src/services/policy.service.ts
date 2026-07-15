import { shopifyFetch } from "@/lib/shopify";
import { getPoliciesQuery } from "@/graphql/policies";
import { ShopifyPoliciesResponse, ShopifyPolicy } from "@/types/shopify";

export async function getPolicyByHandle(handle: string): Promise<ShopifyPolicy | null> {
  const { body } = await shopifyFetch<{ data: ShopifyPoliciesResponse }>({
    query: getPoliciesQuery,
  });

  const shop = body.data?.shop;
  if (!shop) return null;

  // Map handle to the corresponding policy object
  switch (handle) {
    case "privacy":
    case "privacy-policy":
      return shop.privacyPolicy;
    case "refund":
    case "refund-policy":
      return shop.refundPolicy;
    case "shipping":
    case "shipping-policy":
      return shop.shippingPolicy;
    case "terms":
    case "terms-of-service":
      return shop.termsOfService;
    default:
      return null;
  }
}
