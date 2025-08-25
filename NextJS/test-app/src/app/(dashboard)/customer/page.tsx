"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type POST = {
  userID: number;
  id: number;
  title: string;
  body: string;
};

export default function Customer() {
  const [posts, setPosts] = useState<POST[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data: POST[] = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-[1240px] w-full mx-auto">
      <div className="grid grid-cols-4 gap-2">
        {posts.map((post) => (
          <Link key={post.id}
            href={`/customer/${post.id}`}
            className="bg-white p-3 rounded-[8px] flex flex-col hover:shadow-lg cursor-pointer"
          >
            <h4 className="text-gray-900 text-2xl">{post.title}</h4>
            <p className="text-gray-900">{post.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
