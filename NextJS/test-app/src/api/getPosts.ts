import wait from "@/utits/wait";

export default async function getPosts() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=5`
  );
  await wait(1000);
  return response.json();
}
