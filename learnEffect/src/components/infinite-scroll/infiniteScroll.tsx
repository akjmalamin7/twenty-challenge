import { useEffect, useRef, useState } from "react";

const InfiniteScroll = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null)
  const productPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`https://dummyjson.com/products?limit=${productPerPage}&skip=${productPerPage * page}`);
      const data = await res.json();
      if (data.products.length === 0) {
        setHasMore(false)
      } else {
        setProducts(prev => [...prev, ...data.products]);
        setPage(prev => prev + 1)
      }
      console.log(data)
    }

    const onIntersection = (items) => {
      const loaderItem = items[0];
      if (loaderItem.isIntersecting && hasMore) {
        fetchProducts()
      }
    }

    const observer = new IntersectionObserver(onIntersection);
    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (observer) observer.disconnect();
    }

  }, [hasMore, page])
  return (
    <div>
      <div>
        <h1>Product list</h1>


      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(1,minmax(auto,1fr))", gap: "40px" }}>
        {products.map(product => (
          <div key={product.id} style={{ border: "1px solid #ffffff" }}>
            <h3>{product.title}</h3>
            <h4>{product.description}</h4>
          </div>
        ))}
      </div>
      {
        hasMore && <div ref={loaderRef} style={{ padding: "50px" }}>
          <h2>Loading more products...</h2>
        </div>
      }

    </div>
  );
};
export default InfiniteScroll;