import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../contexts/ProductsProvider";
import Searchbar from "../../components/Searchbar/Searchbar";
import ProductCard from "../../components/ProductCard/ProductCard";
import DefaultWithSearch from "../../layouts/DefaultWithSearch";
import { useFilter } from "../../utils/useFilter";
import getSortedData from "../../utils/getSortedData";
import getSearchData from "../../utils/getSearchData";
import { ReactComponent as EmptyProductSvg } from "./EmptyProductImage.svg";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";
import styles from "./ProductListing.module.css";

const ProductListing = () => {
  const {
    isProductsLoading,
    products,
    productlistDispatch,
    isOutOfStock,
    isFastDeliveryAvailable,
    isTopRated,
    isTopSeller,
    sortBy,
    priceRange,
  } = useProducts();
  const { id } = useParams();
  const filteredData = useFilter(
    products,
    id,
    isOutOfStock,
    isFastDeliveryAvailable,
    isTopRated,
    isTopSeller,
    priceRange
  );
  const [searchInput, setSearchInput] = useState("");
  const sortedData = getSortedData(filteredData, sortBy);
  const searchData = getSearchData(sortedData, searchInput);

  if (isProductsLoading) {
    return (
      <DefaultWithSearch>
        <h1 className="overlay">
          <Loader />
        </h1>
      </DefaultWithSearch>
    );
  }

  if (products.length === 0) {
    return (
      <DefaultWithSearch>
        <div className={styles.emptyProductsContainer}>
          <EmptyProductSvg width="80%" />
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              padding: "1rem 2rem",
            }}>
            No Products Found :(
          </p>
          <p>Try again reloading the page</p>
        </div>
      </DefaultWithSearch>
    );
  }

  return (
    <DefaultWithSearch
      searchInput={searchInput}
      setSearchInput={setSearchInput}>
      <div className={styles.gridContainer}>
        <Searchbar setSearchInput={setSearchInput} />
        <div className={styles.sidebar}>
          <fieldset>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0.5rem 0",
              }}>
              <legend>Sort</legend>
              <button
                className={`btn secondary ${styles.clearBtn}`}
                onClick={() =>
                  productlistDispatch({
                    type: "CLEAR_SORT",
                    payload: { sortBy },
                  })
                }>
                Clear
              </button>
            </div>
            <label style={{ marginRight: "1rem" }}>
              <input
                className={styles.inputMargin}
                onChange={() =>
                  productlistDispatch({
                    type: "SORT_BY_PRICE",
                    payload: { sortBy: "LOW_TO_HIGH" },
                  })
                }
                type="radio"
                checked={sortBy === "LOW_TO_HIGH"}
              />
              Low to High
            </label>
            <label>
              <input
                className={styles.inputMargin}
                onChange={() =>
                  productlistDispatch({
                    type: "SORT_BY_PRICE",
                    payload: { sortBy: "HIGH_TO_LOW" },
                  })
                }
                type="radio"
                checked={sortBy === "HIGH_TO_LOW"}
              />
              High to Low
            </label>
          </fieldset>
          <fieldset>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0.5rem 0",
              }}>
              <legend>Filters</legend>
              <button
                className={`btn secondary ${styles.clearBtn}`}
                onClick={() => productlistDispatch({ type: "CLEAR_FILTERS" })}>
                Clear
              </button>
            </div>
            <label className={styles.blockDisplay}>
              <input
                className={styles.inputMargin}
                onChange={() =>
                  productlistDispatch({ type: "TOGGLE_OUT_OF_STOCK" })
                }
                type="checkbox"
                checked={isOutOfStock}
              />
              Exclude Out of Stock
            </label>
            <label className={styles.blockDisplay}>
              <input
                className={styles.inputMargin}
                onChange={() =>
                  productlistDispatch({ type: "TOGGLE_FAST_DELIVERY" })
                }
                type="checkbox"
                checked={isFastDeliveryAvailable}
              />
              Fast Delivery Only
            </label>
            <label className={styles.blockDisplay}>
              <input
                className={styles.inputMargin}
                onChange={() =>
                  productlistDispatch({
                    type: "TOGGLE_RATING",
                  })
                }
                type="checkbox"
                checked={isTopRated}
              />
              Top Rated
            </label>
            <label className={styles.blockDisplay}>
              <input
                className={styles.inputMargin}
                onChange={() =>
                  productlistDispatch({
                    type: "TOGGLE_SELLER",
                  })
                }
                type="checkbox"
                checked={isTopSeller}
              />
              Top Sellers
            </label>
            <label className={styles.blockDisplay}>
              Price Range ₹
              <span
                style={{
                  padding: "0.2rem 0.5rem",
                  border: "1px solid var(--rb-dark-grey)",
                }}>
                {priceRange}
              </span>
              <input
                style={{
                  display: "block",
                  marginTop: "1rem",
                  cursor: "pointer",
                  width: "100%",
                }}
                type="range"
                min="179"
                max="14999"
                value={priceRange}
                onChange={(e) =>
                  productlistDispatch({
                    type: "CHANGE_PRICE",
                    payload: { price: e.target.value },
                  })
                }
              />
            </label>
          </fieldset>
        </div>
        <div className={styles.productListItemContainer}>
          {searchData.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </DefaultWithSearch>
  );
};
export default ProductListing;
