const wishReducer = (state, { type, payload }) => {
  const removeWishItem = () => {
    return state.filter((item) => item.id !== payload.wishItemDetails.id);
  };
  switch (type) {
    case "SET_WISH_DATA":
      return [...payload.wishlist];
    case "ADD_WISH":
      return [...state, { ...payload.item }];
    case "REMOVE_WISH":
      return removeWishItem();
    default:
      return state;
  }
};
export default wishReducer;
