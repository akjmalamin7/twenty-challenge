import getPost from "@/api/getPost";
import getPostComments from "@/api/getPostComments";
import Comments from "@/app/components/ui/comments/Comments";
import { Suspense } from "react";

interface PostPageProps {
  params: { id: string; };
}

export default async function PostPage({ params: { id } }: PostPageProps) {
  const postPromise = getPost(id);
  const commentsPromise = getPostComments(id);

  const post = await postPromise;

  return (
    <div className="px-8">
      <h2 className="text-slate-800 font-semibold text-xl">{post.title}</h2>
      <p className="mt-4 text-slate-700">{post.body}</p>

      <div className="mt-8 border-t border-slate-300 p-4 rounded">
        <h3 className="text-slate-800 font-medium">Comments</h3>
        <div className="mt-4">
          <Suspense fallback={<div className="loading">Loading comments...</div>}>
            <Comments commentsPromise={commentsPromise} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
