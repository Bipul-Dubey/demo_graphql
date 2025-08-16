import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "apps/server/src/schema/typeDefs/index.ts",
  generates: {
    "apps/server/src/generated/resolvers.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../middleware/context#Context", // <-- our Context
        useIndexSignature: true,
        /* Optional: map GraphQL types to Mongoose docs
           User: '../models/User#IUser',
           Post: '../models/Post#IPost',
           Message: '../models/Message#IMessage'
        */
      },
    },
  },
};

export default config;
