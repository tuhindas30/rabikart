const SearchBar = ({ setSearchInput }) => {
  return (
    <div className="search-mobile">
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        className="search-box"
        type="text"
        placeholder="Search for products"
      />
    </div>
  );
};
export default SearchBar;
