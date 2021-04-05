const productReducer = (state, { type, payload }) => {
  switch (type) {
    case "SORT":
      return { ...state, sortBy: payload };
    case "TOGGLE_OUT_OF_STOCK":
      return { ...state, showOutOfStock: !state.showOutOfStock };
    case "TOGGLE_FAST_DELIVERY":
      return { ...state, showFastDelivery: !state.showFastDelivery };
    default:
      return state;
  }
};

export default productReducer;
