import { makeExecutableSchema } from 'graphql-tools';

import { resolvers } from './config/resolvers';
import { typeDefs } from './config/typedefs';

export const schema = makeExecutableSchema({
    resolvers: resolvers,
    typeDefs: typeDefs,
});
