import { GET_URL_RESOLVER } from '@/framework/apollo/queries';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

const getUrlResolver = async (
  apolloClient: ApolloClient<NormalizedCacheObject>,
  slug: string
) => {
  try {
    const { data } = await apolloClient.query({
      query: GET_URL_RESOLVER,
      variables: {
        url: slug,
      },
    });

    return data?.route || null;
  } catch (error) {
    throw error;
  }
};

export default getUrlResolver;
