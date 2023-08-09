import { GET_PRODUCT } from '@/framework/apollo/queries'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

const getProductForWidget = async (
  apolloClient: ApolloClient<NormalizedCacheObject>,
  filters: { [key: string]: any }
) => {
  try {
    const { data } = await apolloClient.query({
      query: GET_PRODUCT,
      variables: {
        filters: filters,
      },
    })

    return data?.products || null
  } catch (error) {
    throw error
  }
}

export default getProductForWidget
