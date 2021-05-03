const getSearchData = (filteredData, searchInput) => {
  return filteredData.filter(
    (item) =>
      item.modelName.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
  );
};
export default getSearchData;
