import { User } from "@workspace/types";
import React from "react";

const RootPage = () => {
  const user: User = {
    createdAt: new Date("2023-10-01T00:00:00Z"),
    email: "",
    id: "1",
    name: "John Doe",
    updatedAt: new Date("2023-10-01T00:00:00Z"),
  };
  return <div className="bg-red-400">RootPage</div>;
};

export default RootPage;
