import { GET_PRODUCT_LIST } from '@/framework/apollo/queries'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

const getProductList = async (
  apolloClient: ApolloClient<NormalizedCacheObject>,
  categoryId: string,
  page: string | string[] | undefined,
  pageSize: string,
  filtersInput: {},
  ProductAttributeSortInput: { [key: string]: string }
) => {
  try {
    const { data, loading } = await apolloClient.query({
      query: GET_PRODUCT_LIST,
      variables: {
        id: categoryId,
        pageSize: pageSize,
        currentPage: page ? parseInt(page as string) : 1,
        filters: filtersInput,
        sort: ProductAttributeSortInput,
      },
    })

    return { data, loading }
  } catch (error) {
    throw error
  }
}

export default getProductList
