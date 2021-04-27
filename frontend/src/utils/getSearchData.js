const getSearchData = (sortedData, searchInput) => {
	return sortedData.filter(
		(item) =>
			item.modelName.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
	);
};
export default getSearchData;
