import wait from "@/utits/wait";

export default async function getPostComments(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );

  await wait(3000);
  return response.json();
}
