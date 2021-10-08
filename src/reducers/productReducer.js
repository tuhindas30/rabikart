const productReducer = (state, { type, payload }) => {
  switch (type) {
    case "SORT_BY_PRICE":
      return { ...state, sortBy: payload.sortBy };

    case "CLEAR_SORT":
      return { ...state, sortBy: null };

    case "TOGGLE_OUT_OF_STOCK":
      return { ...state, isOutOfStock: !state.isOutOfStock };

    case "TOGGLE_FAST_DELIVERY":
      return {
        ...state,
        isFastDeliveryAvailable: !state.isFastDeliveryAvailable,
      };

    case "TOGGLE_RATING":
      return { ...state, isTopRated: !state.isTopRated };

    case "TOGGLE_SELLER":
      return { ...state, isTopSeller: !state.isTopSeller };

    case "CHANGE_PRICE":
      return { ...state, priceRange: payload.price };

    case "CLEAR_FILTERS":
      return {
        ...state,
        isOutOfStock: false,
        isFastDeliveryAvailable: false,
        isTopRated: false,
        isTopSeller: false,
        priceRange: "14999",
      };

    default:
      return state;
  }
};

export default productReducer;
