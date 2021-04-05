const getSearchData = (filteredData, searchInput) => {
  return filteredData.filter(
    (item) =>
      item.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1 ||
      item.brand.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
  );
};
export default getSearchData;
