import { gql } from '@apollo/client'

const CREATE_EMPTY_CART = gql`
  mutation createCart {
    cartId: createEmptyCart
  }
`
export { CREATE_EMPTY_CART }
