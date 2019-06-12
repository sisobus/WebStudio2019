// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { LectureResolvers } from "../generated/resolvers";

export const Lecture: LectureResolvers.Type = {
  ...LectureResolvers.defaultResolvers,

  course: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  },
  comments: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  }
};
