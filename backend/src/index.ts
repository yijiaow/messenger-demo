import { PrismaClient } from '@prisma/client';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './graphql/resolvers.js';
import { typeDefs } from './graphql/typeDefs.js';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
}

const createContext = async () => ({ prisma });

const server = new ApolloServer({
  resolvers,
  typeDefs,
});
const { url } = await startStandaloneServer(server, {
  context: createContext,
  listen: { port: 4000 },
});

console.log(`🚀 Server!!! ready at: ${url}`);
