const wishReducer = (state, { type, payload }) => {
	const removeWishItem = () => {
		payload.setToast({
			display: true,
			addedOrRemoved: "removed from",
			fromComponent: "Wishlist",
		});
		setTimeout(() => {
			payload.setToast({
				display: false,
				addedOrRemoved: "removed from",
				fromComponent: "Wishlist",
			});
		}, 2000);
		return state.filter((item) => item.id !== payload.wishItemDetails.id);
	};
	switch (type) {
		case "SET_WISH_DATA":
			return [...payload.wishlist];
		case "ADD_WISH":
			payload.setToast({
				display: true,
				addedOrRemoved: "added to",
				fromComponent: "Wishlist",
			});
			setTimeout(() => {
				payload.setToast({
					display: false,
					addedOrRemoved: "added to",
					fromComponent: "Wishlist",
				});
			}, 2000);
			return [...state, { ...payload.item }];
		case "REMOVE_WISH":
			return removeWishItem();
		default:
			return state;
	}
};
export default wishReducer;
