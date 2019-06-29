import { gql } from 'graphql.macro';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;
