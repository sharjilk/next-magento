import { GET_PRODUCT_FILTERS_BY_CATEGORY } from '@/framework/apollo/queries'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

const getProductFiltersByCategory = async (
  apolloClient: ApolloClient<NormalizedCacheObject>,
  categoryId: string
) => {
  try {
    const { data } = await apolloClient.query({
      query: GET_PRODUCT_FILTERS_BY_CATEGORY,
      variables: {
        categoryIdFilter: { eq: categoryId },
      },
    })

    return data.products.aggregations || null
  } catch (error) {
    throw error
  }
}

export default getProductFiltersByCategory
