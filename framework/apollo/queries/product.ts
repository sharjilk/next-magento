import { gql } from '@apollo/client'

const GET_PRODUCT = gql`
  query GetProducts($filters: ProductAttributeFilterInput!) {
    products(filter: $filters) {
      items {
        __typename
        name
        image {
          url
        }
        url_key
        url_suffix
        review_count
        price_range {
          minimum_price {
            final_price {
              currency
              value
            }
            regular_price {
              currency
              value
            }
          }
          maximum_price {
            final_price {
              value
              currency
            }
            regular_price {
              value
              currency
            }
          }
        }
      }
    }
  }
`

export { GET_PRODUCT }
