interface POST {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
}
export default async function Blogs() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts: POST[] = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}