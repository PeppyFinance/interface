import { createClient as createWSClient } from 'graphql-ws';
import { Client, cacheExchange, fetchExchange, subscriptionExchange } from 'urql';
import { INDEXER_WS_URL } from './constants';

const wsClient = createWSClient({
  url: INDEXER_WS_URL,
});

export const graphqlClient = new Client({
  url: INDEXER_WS_URL,
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
