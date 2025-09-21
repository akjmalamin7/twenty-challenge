export async function getComments(postId: number) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments/${postId}`);
  const data = await res.json();
  return data;
}