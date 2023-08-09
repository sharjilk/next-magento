import { GET_CMS_HOMEPAGE_CONTENTFUL } from '@/framework/apollo/queries'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

const getCmsHomePageContentful = async (
  apolloClient: ApolloClient<NormalizedCacheObject>,
  homepageId: string
) => {
  try {
    const { data } = await apolloClient.query({
      query: GET_CMS_HOMEPAGE_CONTENTFUL,
      variables: {
        id: homepageId,
      },
    })

    return data || null
  } catch (error) {
    throw error
  }
}

export default getCmsHomePageContentful
