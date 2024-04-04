import React from "react";
import { useCartStore } from "../store/CartStore";
import { CartProduct } from "./CartProduct";

function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const isEmpty = useCartStore((state) => state.cart).size === 0;
  const [totalPrice, setTotalPrice] = React.useState(0);
  return (
    <div
      style={{
        display: "flex",
        margin: "1% 5%",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      {isEmpty ? (
        <>Feels Light...</>
      ) : (
        <>
          <div
            style={{
              border: "1px solid black",
              width: "26%",
              padding: "0 2%",
              height: "fit-content",
              flex: 1,
            }}
          >
            <h3>Order Summary</h3>
            <SummaryContent
              title={"Total MRP:"}
              amount={parseFloat(totalPrice.toFixed(2))}
            />
            <SummaryContent
              title={"Discount:"}
              amount={parseFloat(totalPrice.toFixed(2))}
            />
            <div style={{ fontSize: "12px", textDecoration: "underline" }}>
              <abbr
                title="Nothing wrong with the billing system,
we are just happy and have decided to give out
free stuff. Enjoy Shopping :)"
              >
                Learn More
              </abbr>
            </div>
            <hr />
            <strong>
              <SummaryContent title={"Total Amount:"} amount={0} />
            </strong>
          </div>
          <div className="cart-list">
            {[...cart.keys()].map((key) => (
              <CartProduct key={key} id={key} setTotalPrice={setTotalPrice} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SummaryContent({ title, amount }: SummaryContentProp) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        marginBottom: ".5rem",
      }}
    >
      <div>{title}</div>
      <div>{amount}</div>
    </div>
  );
}

type SummaryContentProp = {
  title: String;
  amount: number;
};

export default CartPage;
