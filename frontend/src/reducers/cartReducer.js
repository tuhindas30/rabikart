const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_CART_DATA":
      return [...state, ...payload.cart];
    case "ADD_TO_CART":
      return [...state, { ...payload.item }];
    case "INC_QTY":
      return [...payload.cart];
    case "DEC_QTY":
      return [...payload.cart];
    case "REMOVE_ITEM":
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
      return [...payload.items];
    default:
      return state;
  }
};
export default cartReducer;
