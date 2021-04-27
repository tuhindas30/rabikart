const getSortedData = (productsData, sortBy) => {
	if (sortBy === "LOW_TO_HIGH") {
		productsData.sort((a, b) => a.discountedPrice - b.discountedPrice);
	}
	if (sortBy === "HIGH_TO_LOW") {
		productsData.sort((a, b) => b.discountedPrice - a.discountedPrice);
	}
	return productsData;
};
export default getSortedData;
