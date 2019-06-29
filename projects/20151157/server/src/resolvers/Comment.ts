// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { CommentResolvers } from "../generated/resolvers";

export const Comment: CommentResolvers.Type = {
  ...CommentResolvers.defaultResolvers,

  lecture: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  },
  user: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  }
};
