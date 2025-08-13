"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";

type User = {
  id: string;
  name: string;
  username: string;
};

interface UserListProps {
  currentUserId: string;
  type: "followers" | "following";
}

export function UserList({ currentUserId, type }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API delay
    setLoading(true);
    setTimeout(() => {
      if (type === "followers") {
        setUsers([
          { id: "2", name: "John Doe", username: "johndoe" },
          {
            id: "3",
            name: "Jane Smith",
            username: "janesmith",
          },
        ]);
      } else {
        setUsers([
          { id: "4", name: "Alex Johnson", username: "alexj" },
          { id: "5", name: "Emily Davis", username: "emilyd" },
        ]);
      }
      setLoading(false);
    }, 800);
  }, [type]);

  const toggleFollow = (userId: string) => {
    setLoadingUserId(userId);
    setTimeout(() => {
      setLoadingUserId(null);
    }, 500);
  };

  if (loading) {
    return (
      <div className="text-center text-muted-foreground py-8">Loading...</div>
    );
  }

  if (!users.length) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No users found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarFallback className="font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </div>

          {/* Show follow/unfollow only in followers list */}
          {type === "following" && (
            <Button
              variant={"secondary"}
              size="sm"
              disabled={loadingUserId === user.id}
              onClick={() => toggleFollow(user.id)}
            >
              Unfollow
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
