const cartReducer = (state, { type, payload }) => {
  const increaseCartItemQuantity = () => {
    return state.map((item) => {
      if (item.id === payload.id) return { ...item, qty: item.qty + 1 };
      return item;
    });
  };
  const decreaseCartItemQuantity = () => {
    return state.map((item) => {
      if (item.id === payload.id) return { ...item, qty: item.qty - 1 };
      return item;
    });
  };

  const removeCartItem = () => {
    return state.filter((item) => item.id !== payload.id);
  };

  switch (type) {
    case "ADD_TO_CART":
      if (state.some((item) => item.id === payload.itemDetails.id)) {
        // payload.setRoute("cart");
        return state;
      }
      return [...state, { ...payload.itemDetails, qty: 1 }];

    case "INC_QTY":
      return increaseCartItemQuantity();
    case "DEC_QTY":
      return decreaseCartItemQuantity();
    case "REMOVE_ITEM":
      return removeCartItem();
    default:
      return state;
  }
};
export default cartReducer;
