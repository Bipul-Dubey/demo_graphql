import { AuthenticationError, ForbiddenError } from "apollo-server-express";
import { Resolvers } from "../../generated/resolvers";
import { Post } from "../../models/Post";
import { User } from "../../models/User";

export const postResolvers: Resolvers = {
  Query: {
    posts: () => Post.find().populate("author").sort({ createdAt: -1 }),
    post: (_, { id }) => Post.findById(id).populate("author"),
    userPosts: (_, { userId }) =>
      Post.find({ author: userId }).populate("author").sort({ createdAt: -1 }),
    myPosts: (_, __, { user, isAuthenticated }) => {
      if (!isAuthenticated || !user)
        throw new AuthenticationError("Not authenticated");
      return Post.find({ author: user.id })
        .populate("author")
        .sort({ createdAt: -1 });
    },
  },

  Mutation: {
    createPost: async (_, { input }, { user, isAuthenticated }) => {
      if (!isAuthenticated || !user)
        throw new AuthenticationError("Not authenticated");
      const post = await Post.create({ ...input, author: user.id });
      return post.populate("author");
    },

    updatePost: async (_, { input }, { user, isAuthenticated }) => {
      if (!isAuthenticated || !user)
        throw new AuthenticationError("Not authenticated");

      const post = await Post.findById(input.id);
      if (!post) throw new Error("Post not found");
      if (post.author.toString() !== user.id)
        throw new ForbiddenError("Not authorized");

      Object.assign(post, input, { updatedAt: new Date() });
      await post.save();
      return post.populate("author");
    },

    deletePost: async (_, { id }, { user, isAuthenticated }) => {
      if (!isAuthenticated || !user)
        throw new AuthenticationError("Not authenticated");

      const post = await Post.findById(id);
      if (!post) throw new Error("Post not found");
      if (post.author.toString() !== user.id)
        throw new ForbiddenError("Not authorized");

      await Post.findByIdAndDelete(id);
      return true;
    },
  },

  Post: {
    author: (parent) => User.findById(parent.author),
  },
};
