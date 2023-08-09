import { GET_MENU_CATEGORIES } from '@/framework/apollo/queries'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

const getMenuCategories = async (
  apolloClient: ApolloClient<NormalizedCacheObject>
) => {
  try {
    const { data } = await apolloClient.query({
      query: GET_MENU_CATEGORIES,
    })

    return data?.categories?.items[0]?.children || null
  } catch (error) {
    throw error
  }
}

export default getMenuCategories
