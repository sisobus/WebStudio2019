import { QueryResolvers } from "../generated/resolvers";

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  courses: (parent, args, { prisma }) =>
    prisma.courses(),
  course: (parent, { id }, { prisma }) =>
    prisma.course({ id }),
  lecture: (parent, { courseId, lectureId }, { prisma }) =>
    prisma.lecture({ id: lectureId }),
}
