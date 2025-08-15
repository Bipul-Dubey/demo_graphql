"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { getInitials } from "@/lib/utils";

export interface Comment {
  id: string;
  author: { name: string };
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  author: {
    name: string;
    username: string;
  };
  content: string;
  tags?: string[];
  createdAt: string;
  comments?: Comment[];
}

export default function PostCard({
  post,
  onAddComment,
}: {
  post: Post;
  onAddComment?: (postId: string, content: string) => void;
}) {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    onAddComment?.(post.id, commentText);
    setCommentText("");
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        {/* Initials Circle */}
        <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
          {getInitials(post.author.name)}
        </span>

        <span>
          <p className="font-semibold">{post.author.name}</p>
          <p className="text-sm text-muted-foreground">
            @{post.author.username}
          </p>
        </span>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Post Content */}
        <p className="whitespace-pre-wrap">{post.content}</p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Comments List */}
        {post.comments && post.comments.length > 0 && (
          <div className="space-y-2 mt-4">
            {post.comments.map((c) => (
              <div key={c.id} className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                  {getInitials(c.author.name)}
                </div>
                <div className="bg-muted/40 rounded-lg p-2 flex-1">
                  <p className="text-sm font-semibold">{c.author.name}</p>
                  <p className="text-sm">{c.content}</p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        {/* Comment Input */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full pr-10 rounded-md border bg-background p-2 text-sm focus:outline-none"
          />
          <button
            onClick={handleCommentSubmit}
            disabled={!commentText.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
          >
            <Send size={16} />
          </button>
        </div>

        {/* Footer Info */}
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <MessageSquare className="w-4 h-4" />
          {post.comments?.length ?? 0} comments
        </div>
      </CardFooter>
    </Card>
  );
}
