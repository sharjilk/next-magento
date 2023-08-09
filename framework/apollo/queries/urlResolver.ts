import { gql } from '@apollo/client'

const GET_URL_RESOLVER = gql`
  query GetURLResolver($url: String!) {
    route(url: $url) {
      redirect_code
      relative_url
      type
      ... on CategoryTree {
        name
        product_count
        uid
        url_key
      }
      ... on ConfigurableProduct {
        url_key
      }
      ... on GroupedProduct {
        url_key
      }
      ... on SimpleProduct {
        sku
        url_key
        id
        type
        name
      }
      ... on CmsPage {
        identifier
        content_heading
        content
      }
    }
  }
`

export { GET_URL_RESOLVER }
