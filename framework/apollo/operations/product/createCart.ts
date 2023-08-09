import { CREATE_EMPTY_CART } from '@/framework/apollo/mutations'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

const createCart = async (
  apolloClient: ApolloClient<NormalizedCacheObject>
) => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_EMPTY_CART,
    })

    const cartId = data?.cartId || null

    return cartId
  } catch (error) {
    throw error
  }
}

export default createCart
