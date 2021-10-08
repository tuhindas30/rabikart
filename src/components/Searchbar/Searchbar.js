import debounce from "../../utils/debounce";
import styles from "./Searchbar.module.css";
const Searchbar = ({ setSearchInput }) => {
  const debouncedSearch = debounce((e) => setSearchInput(e.target.value), 1000);

  return (
    <div className={`${styles.searchMobile}`}>
      <input
        onChange={debouncedSearch}
        className="search-box"
        type="text"
        placeholder="Search for products"
      />
    </div>
  );
};
export default Searchbar;
