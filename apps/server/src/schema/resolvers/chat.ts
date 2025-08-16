import { AuthenticationError } from "apollo-server-express";
import { Resolvers } from "../../generated/resolvers";
import { Message } from "../../models/Message";
import { User } from "../../models/User";
import { EVENTS, pubsub } from "../../services/pubsub";

export const chatResolvers: Resolvers = {
  Query: {
    messages: () =>
      Message.find().populate("author").sort({ createdAt: -1 }).limit(50),
  },

  Mutation: {
    sendMessage: async (_, { input }, { user, isAuthenticated }) => {
      if (!isAuthenticated || !user)
        throw new AuthenticationError("Not authenticated");

      const message = await Message.create({
        content: input.content,
        author: user.id,
      });
      const populated = await message.populate("author");

      // Broadcast to all subscribers
      pubsub.publish(EVENTS.MESSAGE_SENT, { messageSent: populated });
      return populated;
    },
  },

  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterableIterator([EVENTS.MESSAGE_SENT]),
    },
  },

  Message: {
    author: (parent) => User.findById(parent.author),
  },
};
