import { GET_PRODUCT_DETAIL } from '@/framework/apollo/queries'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

const getProductDetail = async (
  apolloClient: ApolloClient<NormalizedCacheObject>,
  urlKey: string
) => {
  try {
    const { data } = await apolloClient.query({
      query: GET_PRODUCT_DETAIL,
      variables: {
        urlKey: urlKey,
      },
    })

    return data || null
  } catch (error) {
    throw error
  }
}

export default getProductDetail
