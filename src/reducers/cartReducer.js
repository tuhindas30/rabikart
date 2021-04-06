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
    payload.setToast({
      display: true,
      addedOrRemoved: "removed from",
      fromComponent: "Cart",
    });
    setTimeout(() => {
      payload.setToast({
        display: false,
        addedOrRemoved: "removed from",
        fromComponent: "Cart",
      });
    }, 2000);
    return state.filter((item) => item.id !== payload.itemDetails.id);
  };

  switch (type) {
    case "ADD_TO_CART":
      if (state.some((item) => item.id === payload.itemDetails.id))
        return state;

      payload.setToast({
        display: true,
        addedOrRemoved: "added to",
        fromComponent: "Cart",
      });
      setTimeout(() => {
        payload.setToast({
          display: false,
          addedOrRemoved: "added to",
          fromComponent: "Cart",
        });
      }, 2000);
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
