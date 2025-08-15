import { Message } from "./Message";
import { useEffect, useRef } from "react";

interface MessageData {
  id: string;
  content: string;
  isUser: boolean;
  timestamp?: string;
  avatar?: string;
  username?: string;
}

interface MessagesProps {
  messages: MessageData[];
}

export function Messages({ messages }: MessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="space-y-2 flex-1 h-0 overflow-y-auto p-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-32 text-muted-foreground">
          No messages yet. Start the conversation!
        </div>
      ) : (
        messages.map((message) => (
          <Message
            key={message.id}
            content={message.content}
            isUser={message.isUser}
            timestamp={message.timestamp}
            avatar={message.avatar}
            username={message.username}
          />
        ))
      )}
    </div>
  );
}
