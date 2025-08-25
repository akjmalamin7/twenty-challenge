"use client"; // Client-side component

import { useEffect, useState } from "react";

type POST = {
  userID: number;
  id: number;
  title: string;
  body: string;
};

type Props = {
  params: { id: string };
};

export default function SingleCustomer({ params }: Props) {
  const [post, setPost] = useState<POST | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
        const data: POST = await res.json();
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts()
  }, [params.id]);

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-[800px] mx-auto p-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="mt-4 text-gray-800">{post.body}</p>
    </div>
  );
}
