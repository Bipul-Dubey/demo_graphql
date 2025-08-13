import React from "react";
import { Input } from "../ui/input";

function PostSearch() {
  return (
    <div className="hidden md:block w-full max-w-sm">
      <Input type="text" placeholder="Search posts..." className="w-full" />
    </div>
  );
}

export default PostSearch;
