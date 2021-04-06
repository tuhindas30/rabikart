import { useCart } from "../../contexts/cart-context";

const CartCard = ({
  item: {
    id,
    name,
    image,
    price,
    brand,
    inStock,
    fastDelivery,
    ratings,
    offer,
    color,
    qty,
  },
}) => {
  const { cartDispatch } = useCart();
  return (
    <div className="card cart-card">
      <div className="cart-card-content-container">
        <div className="cart-card-left">
          <div>
            <img src={image} alt="" />
          </div>
          <div className="qty-changer">
            <button
              onClick={() => cartDispatch({ type: "INC_QTY", payload: { id } })}
              className="btn primary btn-small"
            >
              +
            </button>{" "}
            <span>Qty: {qty}</span>{" "}
            <button
              onClick={() => cartDispatch({ type: "DEC_QTY", payload: { id } })}
              className="btn primary btn-small"
              disabled={qty <= 1 ? true : false}
            >
              -
            </button>
          </div>
        </div>
        <div className="card-content cart-card-content">
          <p>
            {name} ({color})
          </p>
          <p>
            ₹{price} <span style={{ color: "var(--rb-green)" }}>{offer}</span>
          </p>
          <p>#{brand}</p>
          <p>{fastDelivery}</p>
          {ratings >= 4 && (
            <div className="star-num rating-h cart-rating-star-num">
              <span>{ratings}</span> <i className="bi bi-star-fill"></i>
            </div>
          )}
          {ratings >= 2 && ratings < 4 && (
            <div className="star-num rating-m cart-rating-star-num">
              <span>{ratings}</span> <i className="bi bi-star-fill"></i>
            </div>
          )}
          {ratings >= 0 && ratings < 2 && (
            <div className="star-num rating-l cart-rating-star-num">
              <span>{ratings}</span> <i className="bi bi-star-fill"></i>
            </div>
          )}
          {inStock ? <p> In Stock </p> : <p> Out of Stock </p>}
          {fastDelivery ? <p> Fast Delivery </p> : <p> 3 days minimum </p>}
        </div>
      </div>
      <button
        onClick={() => cartDispatch({ type: "REMOVE_ITEM", payload: { id } })}
        className="btn icon"
      >
        <i className="bi bi-trash-fill"></i>
        <span style={{ padding: "0 .5rem" }}>Remove</span>
      </button>
    </div>
  );
};
export default CartCard;
