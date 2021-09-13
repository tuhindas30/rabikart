import debounce from "../../utils/debounce";
import styles from "./NavSearch.module.css";

const NavSearch = ({ onInput }) => {
  const debouncedSearch = debounce((e) => onInput(e.target.value), 1000);

  return (
    <div className={styles.searchDesktop}>
      <input
        onChange={debouncedSearch}
        className="search-box"
        type="text"
        placeholder="Search for products"
      />
    </div>
  );
};

export default NavSearch;
