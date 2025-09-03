import wait from "@/utits/wait";

export default async function getPost(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  await wait(2000);
  return response.json();
}
