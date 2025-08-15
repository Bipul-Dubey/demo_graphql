import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";

interface MessageProps {
  content: string;
  isUser: boolean;
  timestamp?: string;
  avatar?: string;
  username?: string;
}

export function Message({
  content,
  isUser,
  timestamp,
  avatar,
  username,
}: MessageProps) {
  return (
    <div
      className={cn("flex gap-3 p-4", isUser ? "flex-row-reverse" : "flex-row")}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar} />
        <AvatarFallback>
          {isUser ? "U" : getInitials(username ?? "Unknown User")}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "flex flex-col gap-1 max-w-[70%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        {!isUser && username && (
          <span className="text-sm font-medium text-muted-foreground">
            {username}
          </span>
        )}

        <div
          className={cn(
            "rounded-lg px-3 py-2 text-sm",
            isUser ? "bg-primary text-primary-foreground" : "bg-muted"
          )}
        >
          {content}
        </div>

        {timestamp && (
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        )}
      </div>
    </div>
  );
}
