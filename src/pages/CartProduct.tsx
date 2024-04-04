import { useQuery } from "react-query";
import { useCartStore } from "../store/CartStore";
import allAr from "../assets/data.json";

type CartProductPropWrapper = {
  id: Number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
};

export function CartProduct({ id, setTotalPrice }: CartProductPropWrapper) {
  const cart = useCartStore((state) => state.cart);
  const { data, isLoading } = useQuery(
    "GET_CART_PRODUCT" + id,
    () => allAr.filter((item) => item.id === id)[0],
    {
      onSuccess: (res) => {
        const q = cart.get(id as number);
        if (res?.price && q) {
          setTotalPrice((prev) => prev + res.price * q);
        }
      },
      refetchInterval: false,
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <div
      style={{
        width: "92%",
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid black",
        padding: "4%",
        fontSize: "clamp(.5rem,14px,1rem)",
        flexWrap: "wrap",
      }}
    >
      {!isLoading && data && (
        <>
          <img alt="" src={data.image} width="15%" style={{ aspectRatio: 1 }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <div style={{ fontWeight: 600 }}>{data.title}</div>
            <p
              className="card-p-description"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                textOverflow: "ellipsis",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
              }}
            >
              {data.description}
            </p>
          </div>
          <div style={{ width: "20%", fontWeight: 600, marginRight: "2%" }}>
            Rs.{data.price}
            <br />
            <br />
            Quantity:{cart.get(id as number)}
          </div>
        </>
      )}
    </div>
  );
}
