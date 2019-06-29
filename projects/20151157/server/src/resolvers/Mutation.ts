import { MutationResolvers } from "../generated/resolvers";

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  createCourse: (parent, args, ctx) =>
    { throw new Error("Resolver not implemented") },
  createLecture: (parent, { title, content, courseId }, { prisma }) =>
    prisma.createLecture({ title, content, course: { connect: { id: courseId } } }),
  createComment: (parent, args, ctx) =>
    { throw new Error("Resolver not implemented") }
};
