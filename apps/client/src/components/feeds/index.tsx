"use client";

import { useState } from "react";
import PostCard, { Post } from "./PostCard";

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: { name: "Alice Johnson", username: "alicej" },
      content: "Just finished a new feature! 🚀 #nextjs #typescript",
      tags: ["nextjs", "typescript"],
      createdAt: new Date().toISOString(),
      comments: [
        {
          id: "c1",
          author: { name: "Bob Smith" },
          content: "That’s awesome! 🔥",
          createdAt: new Date().toISOString(),
        },
        {
          id: "c2",
          author: { name: "Charlie Brown" },
          content: "Can’t wait to try it out!",
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: "2",
      author: { name: "John Doe", username: "johnd" },
      content: "Anyone here tried GraphQL with Next.js? #graphql #webdev",
      tags: ["graphql", "webdev"],
      createdAt: new Date().toISOString(),
      comments: [],
    },
  ]);

  // Handle new post
  const handlePostSubmit = (content: string, tags: string[]) => {
    const newPost: Post = {
      id: String(posts.length + 1),
      author: { name: "You", username: "you" },
      content,
      tags,
      createdAt: new Date().toISOString(),
      comments: [],
    };
    setPosts([newPost, ...posts]);
  };

  // Handle new comment
  const handleAddComment = (postId: string, content: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments!,
                {
                  id: `${postId}-c${p.comments!.length + 1}`,
                  author: { name: "You" },
                  content,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : p
      )
    );
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onAddComment={handleAddComment} />
      ))}
    </div>
  );
}
