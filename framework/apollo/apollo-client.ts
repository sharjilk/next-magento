import { ApolloClient, InMemoryCache } from '@apollo/client'

//let apolloClient: ApolloClient<any> | null = null;

export const getApolloClient = () => {
  // if (!apolloClient) {
  const apolloClient = new ApolloClient({
    uri: process.env.MAGENTO_URL,
    cache: new InMemoryCache(),
  })
  // }

  return apolloClient
}
