import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://indexer.bigdevenergy.link/e2f5ba4/v1/graphql',
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/graphql/': {
      preset: 'client',
      config: {
        scalars: {
          numeric: 'string',
        },
      },
    },
  },
};

export default config;
