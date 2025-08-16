import { gql } from "graphql-tag";
import { readFileSync } from "fs";
import { join } from "path";

/* Helper: read SDL files as strings */
const load = (filename: string) =>
  gql(readFileSync(join(__dirname, filename), "utf8"));

/* Individual type definitions */
export const userTypeDefs = load("./user.graphql");
export const postTypeDefs = load("./post.graphql");
export const chatTypeDefs = load("./chat.graphql");

/* Root types so that `extend type` directives have a base */
export const rootTypeDefs = gql`
  scalar DateTime

  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`;

/* Combined array (Apollo & graphql-tools accept arrays) */
export const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  postTypeDefs,
  chatTypeDefs,
];
