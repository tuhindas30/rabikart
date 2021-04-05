const getSortedData = (productsData, sortBy) => {
  if (sortBy === "LOW_TO_HIGH") {
    productsData.sort((a, b) => a.price - b.price);
  }
  if (sortBy === "HIGH_TO_LOW") {
    productsData.sort((a, b) => b.price - a.price);
  }
  return productsData;
};
export default getSortedData;
