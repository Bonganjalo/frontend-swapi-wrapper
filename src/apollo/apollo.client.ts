import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const defaultClient = new ApolloClient({
    uri: 'https://tosd6.sse.codesandbox.io/',
    cache: new InMemoryCache()
  })
  