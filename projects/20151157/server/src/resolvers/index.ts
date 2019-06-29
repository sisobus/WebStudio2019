import { Resolvers } from "../generated/resolvers";

import { Query } from "./Query";
import { Course } from "./Course";
import { User } from "./User";
import { Lecture } from "./Lecture";
import { Comment } from "./Comment";
import { Mutation } from "./Mutation";
import { Subscription } from "./Subscription";
import { IResolvers } from "graphql-tools";
import { Context } from "../types";

const _resolvers: Resolvers = {
  Query,
  Course,
  User,
  Lecture,
  Comment,
  Mutation,
  Subscription
}

export const resolvers = <IResolvers<any, Context>><any>_resolvers
