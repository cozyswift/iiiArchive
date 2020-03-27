import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloLink, split } from 'apollo-link';

const httpUri = "http://localhost:4000/graphql";
const wsUri = httpUri.replace(/^https?/, "ws");
//http나 https를 ws로 대치 함

const httpLink = new HttpLink({
  uri: httpUri,
  credentials: "include"
});

const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true
  }
});


export interface Definition {
  kind: string;
  operation?: string;
}

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation }: Definition = getMainDefinition(query);
    // 구독 쿼리 이면 웹소켓을 다른 경우는 httpLink로 통신한다.
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const link = ApolloLink.from([terminatingLink]);


console.log({link});
const inMemoryCache = new InMemoryCache();

export default new ApolloClient({
  link,
  cache: inMemoryCache
});
