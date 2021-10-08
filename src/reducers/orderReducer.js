const orderReducer = (state, { type, payload }) => {
  switch (type) {
    case "INITIALISE_ORDER":
      return [...payload.items];

    case "PLACE_ORDER":
      return [...state, payload.items];

    default:
      return state;
  }
};
export default orderReducer;
