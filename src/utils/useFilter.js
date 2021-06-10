const useFilter = (
  productlist,
  isOutOfStock,
  isFastDeliveryAvailable,
  isTopRated,
  isTopSeller,
  priceRange
) => {
  const filterOutOfStock = () => {
    switch (isOutOfStock) {
      case true:
        return productlist.filter((product) => product.inStock);
      case false:
        return productlist;
      default:
        return productlist;
    }
  };

  const filterFastDelivery = () => {
    const products = filterOutOfStock();
    switch (isFastDeliveryAvailable) {
      case true:
        return products.filter((product) => product.fastDelivery);
      case false:
        return products;
      default:
        return products;
    }
  };

  const filterTopRatings = () => {
    const products = filterFastDelivery();
    switch (isTopRated) {
      case true:
        return products.filter((product) => product.avgRating >= 4);
      case false:
        return products;
      default:
        return products;
    }
  };

  const filterTopSellers = () => {
    const products = filterTopRatings();
    switch (isTopSeller) {
      case true:
        return products.filter((product) => product.sellerRating >= 4);
      case false:
        return products;
      default:
        return products;
    }
  };

  const filterByPrice = () => {
    const products = filterTopSellers();
    return products.filter(
      (product) => product.discountPrice <= Number(priceRange)
    );
  };

  const filteredData = filterByPrice();

  return filteredData;
};

export { useFilter };
