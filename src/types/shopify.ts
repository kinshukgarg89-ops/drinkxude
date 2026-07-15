export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice: {
    amount: string;
    currencyCode: string;
  } | null;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  featuredImage: ShopifyImage | null;
  variants: {
    edges: {
      node: ShopifyVariant;
    }[];
  };
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
      featuredImage: ShopifyImage | null;
    };
    price: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: {
      node: ShopifyCartLine;
    }[];
  };
}

export interface ShopifyPolicy {
  id: string;
  title: string;
  handle: string;
  body: string;
}

export interface ShopifyPoliciesResponse {
  shop: {
    privacyPolicy: ShopifyPolicy | null;
    refundPolicy: ShopifyPolicy | null;
    shippingPolicy: ShopifyPolicy | null;
    termsOfService: ShopifyPolicy | null;
  };
}
