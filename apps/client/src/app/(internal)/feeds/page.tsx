import Feeds from "@/components/feeds";
import PostBox from "@/components/Posts/PostInput";
import React from "react";

const FeedPage = () => {
  return (
    <div className="p-4 max-w-3xl m-auto space-y-4">
      <PostBox />
      <Feeds />
    </div>
  );
};

export default FeedPage;
