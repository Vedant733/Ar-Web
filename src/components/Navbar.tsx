import { TextField } from "@mui/material";
import React, { SetStateAction } from "react";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import { Outlet, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/CartStore";

function Navbar() {
  const navigate = useNavigate();
  const numberOfItems = useCartStore((state) => state.cart).size;
  const [isCategoriesTabOpen, setIsCategoriesTabOpen] = React.useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = React.useState(false);
  const { data, isLoading } = useQuery(
    "GET_CATEGORIES",
    () =>
      fetch("https://fakestoreapi.com/products/categories").then((res) =>
        res.json()
      ),
    {
      refetchOnMount: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
    }
  );
  const [searchText, setSearchText] = React.useState<String>("");
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
            ecom
          </div>
          {location.pathname === "/" && (
            <div
              style={{
                marginLeft: "2rem",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <span
                onClick={() => {
                  setIsCategoriesTabOpen((prev) => !prev);
                }}
              >
                Categories
              </span>
              {isCategoriesTabOpen && (
                <div
                  id="categories"
                  style={{
                    width: "250px",
                    height: "auto",
                    border: "1px solid black",
                    position: "absolute",
                    marginTop: "1em",
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    background: "white",
                  }}
                >
                  {!isLoading &&
                    data?.map((item: string) => (
                      <div
                        className="category_list_name"
                        onClick={() => {
                          setIsCategoriesTabOpen(false);
                          navigate("/categories/" + item);
                        }}
                      >
                        {item}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
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
            style={{
              marginRight: "2rem",
              marginTop: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "60%",
              transition: ".3s all",
            }}
          >
            <AiOutlineSearch
              size="1.8em"
              onClick={() =>
                setIsSearchBarOpen((prev: SetStateAction<boolean>) => {
                  const searchBox = document.getElementById("searchBox");
                  if (!prev) {
                    searchBox?.focus();
                    return true;
                  }
                  return false;
                })
              }
            />
            <TextField
              id="searchBox"
              type="search"
              className="search_input"
              placeholder="Search"
              variant="standard"
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
              }}
              sx={{ width: isSearchBarOpen ? "100%" : 0 }}
            />
          </div>
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
