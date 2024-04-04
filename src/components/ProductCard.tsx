import { useCartStore } from "../store/CartStore";

interface WrapperProp {
  item: Product;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

function ProductCard({ item }: WrapperProp) {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const isCartEmpty = !cart.has(item.id);

  return (
    <div className="product-card">
      <div style={{ display: "flex", width: "100%", overflow: "hidden" }}>
        <img src={item.image} width="100%" style={{ height: "200px" }} />
      </div>
      <div style={{ marginLeft: "8px", padding: "1rem" }}>
        <h4
          className="product-card-title"
          style={{ fontSize: "1.2rem", margin: 0 }}
        >
          {item.title}
        </h4>
        <p
          className="product-card-description"
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
