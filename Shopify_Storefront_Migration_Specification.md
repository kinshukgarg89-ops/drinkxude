# Shopify Storefront Migration Specification

## Objective

Migrate **only** the existing Shop section and Cart of the Next.js
application to Shopify's **Storefront GraphQL API** while preserving the
existing UI.

## Store Information

-   Store Domain: `xudedrink.myshopify.com`
-   Store ID: `89590858016`

**Never hardcode secrets.** Read credentials from `.env.local`.

``` env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=xudedrink.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION=2025-10
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=<STORE_FRONT_PUBLIC_TOKEN>
```

## Official Architecture

Follow Shopify's official Storefront API architecture.

-   Use Storefront GraphQL API.
-   Do NOT use Shopify Buy SDK.
-   Do NOT use deprecated Checkout API.
-   Do NOT use Hydrogen.
-   Do NOT replace the UI with Shopify Web Components.

GraphQL endpoint:

    POST https://xudedrink.myshopify.com/api/2025-10/graphql.json

Headers:

    Content-Type: application/json
    X-Shopify-Storefront-Access-Token:
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

## Scope

Only migrate:

-   Shop section
-   Product cards
-   Add to Cart
-   Cart page
-   Checkout redirect

Everything else must remain untouched.

## Preserve Existing UI

Do not modify:

-   HTML structure
-   CSS
-   Tailwind classes
-   Animations
-   Framer Motion
-   Typography
-   Responsive behavior
-   Spacing
-   Hover effects

Only replace the data source.

## Folder Structure

``` text
src/
 lib/shopify/
   client.ts
   fetch.ts
   config.ts
 graphql/
   products.ts
   cart.ts
 services/
   product.service.ts
   cart.service.ts
 context/
   CartProvider.tsx
 hooks/
   useProducts.ts
   useCart.ts
 types/
   shopify.ts
```

## Required GraphQL Operations

Queries

-   GetProducts
-   GetProductByHandle
-   GetCart

Mutations

-   cartCreate
-   cartLinesAdd
-   cartLinesUpdate
-   cartLinesRemove

## Product Card Mapping

Replace static values with Shopify values:

-   title
-   description
-   featured image
-   price
-   compareAtPrice
-   selected variant
-   availability

## Cart Lifecycle

1.  Read cartId from localStorage.
2.  If found, fetch cart.
3.  If missing or invalid, create cart.
4.  Save cartId.
5.  Never create duplicate carts.

## Add to Cart Flow

1.  Resolve selected variant.
2.  Create cart if necessary.
3.  Execute cartLinesAdd.
4.  Refresh cart.
5.  Update React Context.
6.  Update navbar badge.
7.  Update cart page.
8.  Never refresh the browser.

## Cart Page

Connect existing UI to Shopify.

Support:

-   image
-   title
-   quantity
-   update quantity
-   remove line
-   subtotal
-   estimated total
-   checkout

## Checkout

Redirect using:

``` ts
window.location.href = cart.checkoutUrl;
```

Do not create Checkout objects.

## Error Handling

Gracefully handle:

-   network errors
-   unavailable variants
-   deleted carts
-   missing images
-   out of stock

## Performance

-   Reuse cart
-   Reuse GraphQL client
-   Avoid duplicate requests
-   Use server components where beneficial
-   Keep bundle minimal

## Forbidden

-   shopify-buy
-   Checkout API
-   Hydrogen
-   mock products
-   duplicate cart state
-   UI redesign

## Acceptance Criteria

-   Existing design visually unchanged.
-   Products load from Shopify.
-   Add to Cart uses Shopify Cart API.
-   Cart persists across refreshes.
-   Cart page reads live Shopify cart.
-   Checkout redirects to Shopify checkout.
-   TypeScript passes.
-   Production build succeeds.
-   Explain every modified file after implementation.
