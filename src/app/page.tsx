"use client";

import React, { useState } from "react";
import { useLazyGenericQueryQuery } from "./store/api-slice";
import { Loader } from "@mantine/core";

const JsonPlaceholderUI: React.FC = () => {
  const [endpoint, setEndpoint] = useState<string>("posts");
  const [queryTrigger, { data, isLoading }] = useLazyGenericQueryQuery();

  const fetchData = () => {
    queryTrigger({
      url: `${endpoint}`,
      method: "GET",
      tags: ["Post"],
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">JSONPlaceholder API Viewer</h1>
      <div className="flex gap-4 mb-4">
        <select
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="posts">Posts</option>
          <option value="users">Users</option>
          <option value="comments">Comments</option>
          <option value="todos">Todos</option>
        </select>
        <button
          onClick={fetchData}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Fetch Data
        </button>
      </div>

      {/* Loader */}
      {isLoading ? (
        <div className="flex justify-center my-4">
          <Loader color="blue" size="lg" variant="dots" />
        </div>
      ) : (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Results:</h2>
          <pre className="p-4 bg-gray-100 border rounded overflow-auto max-h-96">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default JsonPlaceholderUI;
