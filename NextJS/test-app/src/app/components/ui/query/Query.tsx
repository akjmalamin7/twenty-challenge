"use client"

import { useSearchParams } from "next/navigation";

const Query = () => {
  const searchParams = useSearchParams()
  const updateParams = (sortOrder: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sortOrder);
    window.history.pushState(null, "", `?${params.toString()}`)

  }
  return (
    <div className="flex gap-4 mt-5">
      <button className="px-3 py-1 bg-white text-gray-950 rounded-xl cursor-pointer" onClick={() => updateParams("asc")}>Sorting (ASC)</button>
      <button className="px-3 py-1 bg-white text-gray-950 rounded-xl cursor-pointer" onClick={() => updateParams("dsc")}>Sorting (DESC)</button>
    </div>
  );
};
export default Query;