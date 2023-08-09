import { gql } from '@apollo/client'

const GET_MENU_CATEGORIES = gql`
  query GetMenuCategories {
    categories {
      items {
        name
        children {
          uid
          url_key
          name
        }
      }
    }
  }
`

export { GET_MENU_CATEGORIES }
