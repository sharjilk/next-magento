import { gql } from '@apollo/client'

const GET_PRODUCT_FILTERS_BY_CATEGORY = gql`
  query getProductFiltersByCategory($categoryIdFilter: FilterEqualTypeInput!) {
    products(filter: { category_uid: $categoryIdFilter }) {
      aggregations {
        label
        count
        attribute_code
        options {
          label
          value
          __typename
        }
        position
        __typename
      }
      __typename
    }
  }
`

export { GET_PRODUCT_FILTERS_BY_CATEGORY }
