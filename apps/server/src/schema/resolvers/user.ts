import { AuthenticationError, UserInputError } from "apollo-server-express";
import { Resolvers } from "../../generated/resolvers";
import { User } from "../../models/User";
import { Post } from "../../models/Post";
import { generateToken } from "../../middleware/auth";
import bcrypt from "bcryptjs";

export const userResolvers: Resolvers = {
  Query: {
    /* Return current user (requires JWT) */
    me: async (_, __, { user, isAuthenticated }) => {
      if (!isAuthenticated || !user)
        throw new AuthenticationError("Not authenticated");
      return user;
    },

    user: async (_, { id }) => User.findById(id),
    users: async () => User.find(),
  },

  Mutation: {
    register: async (_, { input }) => {
      const { username, email, password } = input;

      /* Ensure unique email & username */
      const exists = await User.findOne({ $or: [{ email }, { username }] });
      if (exists) throw new UserInputError("User already exists");

      const hashed = await bcrypt.hash(password, 12);
      const user = await User.create({ username, email, password: hashed });
      const token = generateToken({ userId: user.id, email: user.email });

      return { token, user };
    },

    login: async (_, { input }) => {
      const { email, password } = input;
      const user = await User.findOne({ email }).select("+password");
      if (!user || !(await bcrypt.compare(password, user.password)))
        throw new AuthenticationError("Invalid credentials");

      const token = generateToken({ userId: user.id, email: user.email });
      return { token, user };
    },
  },

  /* Field resolvers */
  User: {
    posts: async (parent) =>
      Post.find({ author: parent.id }).sort({ createdAt: -1 }),
  },
};
