import Query from "@/app/components/ui/query/Query";
import { Suspense } from "react";

const ParamsQuery = () => {
  return (
    <div className="max-w-[1240px] w-full mx-auto mt-5">
      <p>Params query</p>
      <Suspense>
        <Query />
      </Suspense>
    </div>
  );
};
export default ParamsQuery;