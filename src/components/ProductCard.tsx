import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/CartStore";

interface WrapperProp {
  item: Product;
}

export interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  image: string;
}

function ProductCard({ item }: WrapperProp) {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const isCartEmpty = !cart.has(item.id);
  const navigate = useNavigate();
  return (
    <div
      className="product-card"
      onClick={() => {
        navigate("/" + item.id);
      }}
    >
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <img src={item.image} width="200px" style={{ aspectRatio: 1.3 }} />
      </div>
      <div style={{ marginLeft: "8px" }}>
        <h4 style={{ fontSize: "1.2rem", margin: 0 }}>{item.title}</h4>
        <p
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            textOverflow: "ellipsis",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
          }}
        >
          {item.description}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <strong>Rs.{item.price}</strong>
          <div style={{ display: "flex" }}>
            {!isCartEmpty && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart(item.id);
                }}
              >
                -
              </button>
            )}
            <button
              className={isCartEmpty ? `cart-buttons` : ""}
              style={{
                viewTransitionName: "cartbutton",
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (isCartEmpty) addToCart(item.id);
              }}
            >
              {isCartEmpty ? `Add to Cart` : cart.get(item.id)}
            </button>
            {!isCartEmpty && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item.id);
                }}
                style={{
                  viewTransitionName: "cartbutton",
                }}
              >
                +
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
