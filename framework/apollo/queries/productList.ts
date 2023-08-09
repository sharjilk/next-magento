import { gql } from '@apollo/client'

const GET_PRODUCT_LIST = gql`
  query GetCategories(
    $id: String!
    $pageSize: Int!
    $currentPage: Int!
    $filters: ProductAttributeFilterInput!
    $sort: ProductAttributeSortInput
  ) {
    categories(filters: { category_uid: { in: [$id] } }) {
      items {
        uid
        ...CategoryFragment
      }
    }
    products(
      pageSize: $pageSize
      currentPage: $currentPage
      filter: $filters
      sort: $sort
    ) {
      ...ProductsFragment
    }
  }

  fragment CategoryFragment on CategoryTree {
    uid
    meta_title
    meta_keywords
    meta_description
    breadcrumbs {
      category_level
      category_name
      category_uid
      category_url_key
      category_url_path
    }
    name
    image
    description
  }

  fragment ProductsFragment on Products {
    items {
      uid
      name
      __typename
      price_range {
        minimum_price {
          final_price {
            currency
            value
          }
          regular_price {
            value
            currency
          }
        }
        maximum_price {
          final_price {
            currency
            value
          }
          regular_price {
            currency
            value
          }
          discount {
            amount_off
          }
        }
      }
      sku
      small_image {
        url
      }
      stock_status
      rating_summary
      url_key
      url_suffix
    }
    page_info {
      total_pages
    }
    total_count
    aggregations {
      attribute_code
      label
      count
      position
      options {
        count
        label
        value
      }
    }
  }
`

export { GET_PRODUCT_LIST }
