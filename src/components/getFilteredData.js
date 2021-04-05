const getFilteredData = (sortedData, showOutOfStock, showFastDelivery) => {
  switch (showOutOfStock) {
    case true:
      if (showFastDelivery === false) return sortedData;
      return sortedData.filter((item) => item.fastDelivery);
    case false:
      if (showFastDelivery)
        return sortedData
          .filter((item) => item.inStock)
          .filter((item) => item.fastDelivery);
      return sortedData.filter((item) => item.inStock);
    default:
      return sortedData;
  }
};
export default getFilteredData;
