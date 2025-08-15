"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";
import PostFeed from "../feeds";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<
    "posts" | "followers" | "following"
  >("posts");

  const user = {
    name: "Bipul Dubey",
    email: "bipul@example.com",
    joinedAt: "January 2025",
    postCount: 42,
    followers: 120,
    following: 80,
  };

  return (
    <div className="py-6 space-y-6">
      {/* Profile Header */}
      <Card className="shadow-sm">
        <CardContent className="flex items-center gap-4 p-6">
          <Avatar className="h-20 w-20 border">
            <AvatarFallback className="text-xl font-bold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>

            <div className="flex items-center gap-6 mt-3 text-sm">
              <div className="flex flex-col items-center">
                <span className="font-semibold">{user.postCount}</span>
                <span className="text-muted-foreground">Posts</span>
              </div>
            </div>

            <div className="mt-2 text-xs text-muted-foreground">
              Joined: {user.joinedAt}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Tabs */}
      <div className="flex gap-2 border-b">
        {[{ key: "posts", label: "Posts" }].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={cn(
              "px-4 py-2 font-medium transition-colors border-b-2",
              activeTab === tab.key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        <PostFeed />
      </div>
    </div>
  );
}
