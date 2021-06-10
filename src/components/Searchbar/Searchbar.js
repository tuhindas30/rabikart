import styles from "./Searchbar.module.css";
const Searchbar = ({ setSearchInput }) => {
  return (
    <div className={`${styles.searchMobile}`}>
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        className="search-box"
        type="text"
        placeholder="Search for products"
      />
    </div>
  );
};
export default Searchbar;
