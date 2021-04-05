const wishReducer = (state, { type, payload }) => {
  // const { setToast } = useToast();

  const removeWishItem = () => {
    payload.setToast({
      display: true,
      addedOrRemoved: "removed",
      fromComponent: "Wishlist",
    });
    setTimeout(() => {
      payload.setToast({
        display: false,
        addedOrRemoved: "removed",
        fromComponent: "Wishlist",
      });
    }, 2000);
    return state.filter((item) => item.id !== payload.wishItemDetails.id);
  };
  switch (type) {
    case "ADD_WISH":
      if (state.some((item) => item.id === payload.wishItemDetails.id))
        return removeWishItem();
      payload.setToast({
        display: true,
        addedOrRemoved: "added",
        fromComponent: "Wishlist",
      });
      setTimeout(() => {
        payload.setToast({
          display: false,
          addedOrRemoved: "added",
          fromComponent: "Wishlist",
        });
      }, 2000);
      return [...state, { ...payload.wishItemDetails }];
    case "REMOVE_WISH":
      return removeWishItem();
    default:
      return state;
  }
};
export default wishReducer;
