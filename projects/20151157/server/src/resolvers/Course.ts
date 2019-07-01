import { CourseResolvers } from "../generated/resolvers";

export const Course: CourseResolvers.Type = {
  ...CourseResolvers.defaultResolvers,
  owner: ({ id }, args, { prisma }) => prisma.course({ id }).owner(),
  lectures: ({ id }, args, { prisma }) => prisma.course({ id }).lectures(),
}
