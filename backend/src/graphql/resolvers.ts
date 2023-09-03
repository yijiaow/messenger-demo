import { User } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { Context } from '../';

export const resolvers = {
  Query: {
    searchUsers: async function searchUsers(
      _: any,
      args: { username: string },
      context: Context
    ): Promise<Array<User>> {
      const { prisma } = context;

      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: args.username,
              mode: 'insensitive',
            },
          },
        });

        return users;
      } catch (error: unknown) {
        console.error(error);
        throw new GraphQLError(JSON.stringify(error));
      }
    },
  },
};
