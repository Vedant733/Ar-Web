import { AiOutlineShoppingCart } from "react-icons/ai";
import { Outlet, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/CartStore";

function Navbar() {
  const navigate = useNavigate();
  const numberOfItems = useCartStore((state) => state.cart).size;

  return (
    <>
      <div
        style={{
          width: "90%",
          height: "80px",
          padding: "0 5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            onClick={() => navigate("/")}
            style={{
              border: "4px solid black",
              width: "fit-content",
              padding: "6px 12px",
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            HomeIT
          </div>
          {location.pathname !== "/" && (
            <div
              className="special_text"
              onClick={() => navigate("/")}
              style={{ marginLeft: "2rem", cursor: "pointer" }}
            >
              Shop More
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "70%",
            justifyContent: "flex-end",
          }}
        >
          <div
            onClick={() => navigate("/cart")}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <AiOutlineShoppingCart size="2em" />
            {numberOfItems > 0 && !location.pathname.endsWith("/cart") && (
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                  position: "absolute",
                  width: "15px",
                  aspectRatio: 1,
                  background: "red",
                  top: 0,
                  right: 0,
                  borderRadius: "50%",
                  fontSize: "8px",
                  color: "white",
                }}
              >
                {numberOfItems}
              </div>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
