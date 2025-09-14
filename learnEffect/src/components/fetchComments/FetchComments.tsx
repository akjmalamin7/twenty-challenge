import { useEffect, useState } from "react";
import { getComments } from "./fetchComment";

const FetchComments = () => {
  const [comments, setComments] = useState([])
  useEffect(() => {
    let ignore = false;
    async function getData() {
      const com = await getComments(1)
      if (!ignore) {
        setComments(com)
      }
    }
    getData();
    return () => {
      ignore = true
    }
  }, [])
  console.log(comments)
  return (
    <>

    </>
  );
};
export default FetchComments;