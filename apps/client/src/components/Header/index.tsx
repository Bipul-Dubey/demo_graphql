"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import PostSearch from "./PostSearch";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const userName = "Bipul Dubey";

  // Get initials: 1 letter if single word, 2 if two+ words

  const handleLogout = () => {
    console.log("Logging out...");
    // Add your logout logic here
    router.replace("/");
  };

  return (
    <header className="h-14 bg-background/80 border-b flex items-center px-4 justify-between sticky top-0 z-50 backdrop-blur-sm">
      {/* Left: Logo / Title */}
      <div className="font-bold text-lg tracking-tight">GraphQL Feed</div>

      {/* Center: Search Bar */}
      <PostSearch />

      {/* Right: Avatar with Menu */}
      <div className="flex items-center gap-4">
        <Separator orientation="vertical" className="h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer border hover:scale-105 transition">
              <AvatarFallback>{getInitials(userName)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => router.push("/profile/abc")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-500 focus:text-red-500"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
