import "../assets/css/ProductListing.css";
import SearchBar from "../components/SearchBar";
import getSortedData from "../utils/getSortedData";
import getSearchData from "../utils/getSearchData";
import getFilteredData from "../utils/getFilteredData";
import { useCart } from "../contexts/cart-context";
import { useWish } from "../contexts/wishlist-context";
import { useProducts } from "../contexts/products-context";
import { useToast } from "../contexts/toast-context";
import ProductCard from "../components/ProductCard";
import { useState } from "react";

const ProductListing = () => {
  const { productsData } = useProducts();
  const { cartState, cartDispatch } = useCart();
  const { wishState, wishDispatch } = useWish();
  const {
    showOutOfStock,
    showFastDelivery,
    sortBy,
    productDispatch,
  } = useProducts();
  const { setToast } = useToast();
  const [searchInput, setSearchInput] = useState("");
  const sortedData = getSortedData(productsData, sortBy);
  const filteredData = getFilteredData(
    sortedData,
    showOutOfStock,
    showFastDelivery
  );
  const searchData = getSearchData(filteredData, searchInput);

  return (
    <>
      <SearchBar setSearchInput={setSearchInput} />
      <div className="grid--container">
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
          <fieldset>
            <legend>Filters</legend>
            <label>
              <input
                onChange={() =>
                  productDispatch({ type: "TOGGLE_OUT_OF_STOCK" })
                }
                type="checkbox"
                checked={showOutOfStock}
              />
              Out of Stock
            </label>
            <label>
              <input
                onChange={() =>
                  productDispatch({ type: "TOGGLE_FAST_DELIVERY" })
                }
                type="checkbox"
                checked={showFastDelivery}
              />
              Fast Delivery Only
            </label>
          </fieldset>
        </fieldset>
        <div className="product-list-item--container">
          {searchData.length > 0 ? (
            searchData.map((itemDetails) => (
              <ProductCard
                key={itemDetails._id}
                itemDetails={itemDetails}
                wishState={wishState}
                wishDispatch={wishDispatch}
                cartState={cartState}
                cartDispatch={cartDispatch}
                setToast={setToast}
              />
            ))
          ) : (
            <h1>No products available</h1>
          )}
        </div>
      </div>
    </>
  );
};
export default ProductListing;
