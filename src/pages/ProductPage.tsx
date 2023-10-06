import { useQuery } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import { useCartStore } from "../store/CartStore";

function ProductPage() {
  const { id: stringId } = useParams();
  if (!stringId) return <Navigate to="/" />;

  const id = parseInt(stringId);
  if (isNaN(id)) return <Navigate to="/" />;
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const isCartEmpty = !cart.has(id);
  const { data, isLoading, error } = useQuery(
    "GET_CART_PRODUCT" + id,
    () =>
      fetch("https://fakestoreapi.com/products/" + id).then((res) =>
        res.json()
      ),
    {
      refetchInterval: false,
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  if (error) return <Navigate to="/" />;

  return (
    <div className="product_page" style={{ display: "flex", margin: "1% 5%" }}>
      {!isLoading && (
        <>
          <div className="pp1" style={{ width: "40%" }}>
            <img
              alt=""
              style={{ aspectRatio: 1, width: "100%" }}
              src={data.image}
            />
          </div>
          <div className="pp2" style={{ width: "55%", paddingLeft: "5%" }}>
            <h2>{data.title}</h2>
            <h3>Price: Rs.{data.price}</h3>
            <div style={{ display: "flex" }}>
              {!isCartEmpty && (
                <button onClick={() => removeFromCart(id)}>-</button>
              )}
              <button
                className={isCartEmpty ? `cart-buttons` : ""}
                style={{
                  viewTransitionName: "cartbutton",
                }}
                onClick={() => {
                  addToCart(id);
                }}
              >
                {isCartEmpty ? `Add to Cart` : cart.get(id)}
              </button>
              {!isCartEmpty && (
                <button
                  onClick={() => addToCart(id)}
                  style={{
                    viewTransitionName: "cartbutton",
                  }}
                >
                  +
                </button>
              )}
            </div>
            <p>{data.description}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductPage;
