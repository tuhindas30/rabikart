const wishlistReducer = (state, { type, payload }) => {
  switch (type) {
    case "INITIALISE_WISHLIST":
      return [...payload.items];

    case "ADD_TO_WISHLIST":
      return [...payload.items];

    case "REMOVE_FROM_WISHLIST":
      return [...payload.items];

    default:
      return state;
  }
};
export default wishlistReducer;
