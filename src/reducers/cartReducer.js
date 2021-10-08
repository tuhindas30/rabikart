const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case "INITIALISE_CART":
      return { ...payload.cart };

    case "ADD_TO_CART":
      return { ...payload.cart };

    case "CHANGE_QUANTITY":
      return { ...payload.cart };

    case "REMOVE_FROM_CART":
      return { ...payload.cart };

    default:
      return state;
  }
};
export default cartReducer;
