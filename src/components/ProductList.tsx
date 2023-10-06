import { useQuery } from "react-query";
import ProductCard, { Product } from "./ProductCard";

function ProductList() {
  const {
    data: productsList,
    isLoading,
    error,
  } = useQuery(
    ["GET_PRODUCTS"],
    async () =>
      await fetch(`https://fakestoreapi.com/products`).then((res) =>
        res.json()
      ),
    {
      keepPreviousData: true,
      retry: 1,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <div className="productList">
        {error && <>Error While Loading Products</>}
        {!isLoading &&
          productsList?.map((item: Product) => (
            <ProductCard key={item.id} item={item} />
          ))}
      </div>
    </>
  );
}

export default ProductList;
