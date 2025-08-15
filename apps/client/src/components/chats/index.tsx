"use client";
import { useState } from "react";
import { Messages } from "./Messages";
import { ChatInput } from "./ChatInput";

interface MessageData {
  id: string;
  content: string;
  isUser: boolean;
  timestamp?: string;
  avatar?: string;
  username?: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<MessageData[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      isUser: false,
      timestamp: "10:00 AM",
      username: "Assistant",
    },
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage: MessageData = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate a response (replace with your actual logic)
    setTimeout(() => {
      const response: MessageData = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message! This is a simulated response.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        username: "Assistant",
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  return (
    <div
      className="flex flex-col max-w-4xl mx-auto border-x"
      style={{ height: "calc(100vh - 75px)" }}
    >
      {" "}
      {/* Header */}
      <div className="border-b bg-background p-4">
        <h1 className="font-semibold">Chat</h1>
      </div>
      {/* Messages */}
      <Messages messages={messages} />
      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
