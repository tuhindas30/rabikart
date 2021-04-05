import { useState } from "react";
import { useCart } from "../contexts/cart-context";
import data from "../Data";
import { useWish } from "../contexts/wishlist-context";
import { useProducts } from "../contexts/products-context";
import { useToast } from "../contexts/toast-context";
import ProductCard from "./ProductCard";
import getSortedData from "./getSortedData";
import getFilteredData from "./getFilteredData";
import getSearchData from "./getSearchData";
import SearchBar from "./SearchBar";

const ProductListing = () => {
  const productsData = data();
  const { cartState, cartDispatch } = useCart();
  const { wishState, wishDispatch } = useWish();
  const {
    productState: { showOutOfStock, showFastDelivery, sortBy },
    productDispatch,
  } = useProducts();
  const { setToast } = useToast();
  const sortedData = getSortedData(productsData, sortBy);
  const filteredData = getFilteredData(
    sortedData,
    showOutOfStock,
    showFastDelivery
  );
  const [searchInput, setSearchInput] = useState("");

  const searchData = getSearchData(filteredData, searchInput);
  return (
    <>
      <SearchBar setSearchInput={setSearchInput} />
      <fieldset>
        <legend>Sort By</legend>
        <label>
          <input
            onChange={() =>
              productDispatch({ type: "SORT", payload: "LOW_TO_HIGH" })
            }
            type="radio"
            checked={sortBy === "LOW_TO_HIGH"}
          />
          Low to High
        </label>
        <label>
          <input
            onChange={() =>
              productDispatch({ type: "SORT", payload: "HIGH_TO_LOW" })
            }
            type="radio"
            checked={sortBy === "HIGH_TO_LOW"}
          />
          High to Low
        </label>
      </fieldset>
      <fieldset>
        <legend>Filters</legend>
        <label>
          <input
            onChange={() => productDispatch({ type: "TOGGLE_OUT_OF_STOCK" })}
            type="checkbox"
            checked={showOutOfStock}
          />
          Include out of stock
        </label>
        <label>
          <input
            onClick={() => {
              productDispatch({ type: "TOGGLE_FAST_DELIVERY" });
            }}
            type="checkbox"
            checked={showFastDelivery}
          />
          Include fast delivery only
        </label>
      </fieldset>
      {searchData.map((itemDetails) => (
        <ProductCard
          itemDetails={itemDetails}
          wishState={wishState}
          wishDispatch={wishDispatch}
          cartState={cartState}
          cartDispatch={cartDispatch}
          setToast={setToast}
        />
      ))}
    </>
  );
};
export default ProductListing;
