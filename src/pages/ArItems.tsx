import ProductCard, { Product } from "../components/ProductCard";
import data from "../assets/data.json";

function ArItems() {
  return (
    <>
      <div className="productList">
        {data?.map((item: Product) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

export default ArItems;
