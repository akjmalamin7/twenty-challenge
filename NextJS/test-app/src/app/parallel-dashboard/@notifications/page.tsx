import wait from "@/utits/wait";
import Link from "next/link";

export default async function page() {
  await wait(2200)
  return <div>
    <p>Notifications page</p>
    <Link href={"/parallel-dashboard/seen"} className="text-blue-700" >SEEN</Link>
  </div>;
}
