import { ApolloClient, InMemoryCache } from '@apollo/client'

//let apolloClient: ApolloClient<any> | null = null;

export const getApolloClientContentful = () => {
  // if (!apolloClient) {
  const apolloClientContentful = new ApolloClient({
    uri: `${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}${process.env.CONTENTFUL_SPACE_ID}`,
    cache: new InMemoryCache(),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
  })
  // }

  return apolloClientContentful
}
