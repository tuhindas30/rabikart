import styles from "./Navbar.module.css";

const Search = ({ input, onInput }) => {
  return (
    <div className={styles.searchDesktop}>
      <input
        value={input}
        onChange={(e) => onInput(e.target.value)}
        className="search-box"
        type="text"
        placeholder="Search for products"
      />
    </div>
  );
};

export default Search;
