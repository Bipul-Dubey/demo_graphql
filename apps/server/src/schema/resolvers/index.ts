import { GraphQLDateTime } from "graphql-scalars";
import { merge } from "lodash";
import { userResolvers } from "./user";
import { postResolvers } from "./post";
import { chatResolvers } from "./chat";

/* Merge all resolver maps together */
export const resolvers = merge(
  { DateTime: GraphQLDateTime }, // scalar
  userResolvers,
  postResolvers,
  chatResolvers
);
