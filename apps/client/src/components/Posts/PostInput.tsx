"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react"; // Shadcn icon

export default function PostBox({
  onPostSubmit,
}: {
  onPostSubmit?: (content: string, tags: string[]) => void;
}) {
  const [content, setContent] = useState("");

  const extractTags = (text: string) => {
    const matches = text.match(/#\w+/g) || [];
    return matches.map((tag) => tag.substring(1)); // remove '#'
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    if (!content.trim()) return;
    const tags = extractTags(content);
    onPostSubmit?.(content, tags);
    setContent("");
  };

  return (
    <div className="border rounded-xl bg-card shadow-sm">
      {/* Textarea */}
      <Textarea
        placeholder="What's on your mind? Use #tags to categorize..."
        value={content}
        onChange={handleChange}
        className="border-none rounded-b-none resize-none max-h-[200px] overflow-y-auto shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      {/* Send Button inside input */}
      <div className="w-full flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!content.trim()}
          size="icon"
          variant="ghost"
        >
          <Send className="w-5 h-5 mr-3" />
        </Button>
      </div>
    </div>
  );
}
