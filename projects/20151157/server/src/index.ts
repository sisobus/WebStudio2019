import { GraphQLServer } from 'graphql-yoga';
import { prisma } from './generated/prisma-client';
import { resolvers } from './resolvers';
import { Context } from './types';

const context: Context = {
  prisma,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context,
})

server.start(() => console.log('Server is running on http://localhost:4000'))
