export const getPoliciesQuery = `
  query getPolicies {
    shop {
      privacyPolicy {
        id
        title
        handle
        body
      }
      refundPolicy {
        id
        title
        handle
        body
      }
      shippingPolicy {
        id
        title
        handle
        body
      }
      termsOfService {
        id
        title
        handle
        body
      }
    }
  }
`;
