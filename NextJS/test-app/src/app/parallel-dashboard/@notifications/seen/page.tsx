import wait from "@/utits/wait";
import Link from "next/link";

const Page = async () => {
  await wait(2200)
  return (
    <div>
      <p>Seen Notifications page</p>
      <Link href={"/parallel-dashboard"} className="text-blue-700" >All</Link>

    </div>
  );
};
export default Page;