import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

const uri = `http://localhost:4000/graphql`;

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization:
        '12kj123j124kj1v23kv4vk1j23kh1v41k231kh1vjo123hk1v24khg1v2312',
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, createUploadLink({ uri })]),
  cache: new InMemoryCache(),
});

export default client;
