const getSortedData = (productlist, sortBy) => {
  if (sortBy === "LOW_TO_HIGH") {
    productlist.sort((a, b) => a.discountPrice - b.discountPrice);
  }
  if (sortBy === "HIGH_TO_LOW") {
    productlist.sort((a, b) => b.discountPrice - a.discountPrice);
  }
  return productlist;
};
export default getSortedData;
