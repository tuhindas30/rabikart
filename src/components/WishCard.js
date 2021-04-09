import { useToast } from "../contexts/toast-context";
const WishCard = ({
  item: {
    id,
    image,
    name,
    color,
    price,
    offer,
    brand,
    fastDelivery,
    ratings,
    inStock,
  },
  wishDispatch,
}) => {
  const { setToast } = useToast();
  return (
    <div key={id} className="card wish-card">
      <div
        onClick={() =>
          wishDispatch({
            type: "REMOVE_WISH",
            payload: { wishItemDetails: { id }, setToast },
          })
        }
        className="remove-wish-btn"
      >
        <i class="bi bi-x-circle-fill"></i>
      </div>
      <img src={image} alt="" />
      <div className="card-content">
        <p>
          {brand} {name} ({color})
        </p>
        <p>
          ₹{price} <span style={{ color: "var(--rb-green)" }}>{offer}</span>
        </p>
        <p>{fastDelivery}</p>
        {ratings >= 4 && (
          <div className="star-num rating-h wish-rating-star-num">
            <span>{ratings}</span> <i className="bi bi-star-fill"></i>
          </div>
        )}
        {ratings >= 2 && ratings < 4 && (
          <div className="star-num rating-m wish-rating-star-num">
            <span>{ratings}</span> <i className="bi bi-star-fill"></i>
          </div>
        )}
        {ratings >= 0 && ratings < 2 && (
          <div className="star-num rating-l wish-rating-star-num">
            <span>{ratings}</span> <i className="bi bi-star-fill"></i>
          </div>
        )}
        {inStock ? <p> In Stock </p> : <p> Out of Stock </p>}
        {fastDelivery ? <p> Fast Delivery </p> : <p> 3 days minimum </p>}
      </div>
    </div>
  );
};
export default WishCard;
