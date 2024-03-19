import { createClient as createWSClient } from 'graphql-ws';
import { Client, cacheExchange, fetchExchange, subscriptionExchange } from 'urql';

const wsClient = createWSClient({
  url: 'wss://indexer.bigdevenergy.link/90bf99a/v1/graphql',
});

export const graphqlClient = new Client({
  url: 'wss://indexer.bigdevenergy.link/90bf99a/v1/graphql',
  exchanges: [
    cacheExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(request) {
        const input = { ...request, query: request.query || '' };
        return {
          subscribe(sink) {
            const unsubscribe = wsClient.subscribe(input, sink);
            return { unsubscribe };
          },
        };
      },
    }),
  ],
});
