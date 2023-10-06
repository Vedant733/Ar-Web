import { useQuery } from "react-query";
import ProductCard, { Product } from "../components/ProductCard";
import { Navigate, useParams } from "react-router-dom";

function CategoryPage() {
  const { category } = useParams();
  if (!category) return <Navigate to="/" />;
  const {
    data: productsList,
    isLoading,
    error,
  } = useQuery(
    ["GET_PRODUCTS_BY_CATEGORY" + category],
    async () =>
      await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      ).then((res) => res.json()),
    {
      keepPreviousData: true,
      retry: 1,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  if (error) return <Navigate to="/" />;
  return (
    <div className="productList">
      {error && <>Error While Loading Products</>}
      {!isLoading &&
        productsList?.map((item: Product) => (
          <ProductCard key={item.id} item={item} />
        ))}
    </div>
  );
}

export default CategoryPage;
