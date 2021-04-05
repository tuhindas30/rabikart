import { Link } from "react-router-dom";
const ProductCard = ({
  itemDetails: {
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
  },
  wishState,
  wishDispatch,
  cartState,
  cartDispatch,
  setToast,
}) => {
  return (
    <div key={id} className="card product-card">
      <div
        onClick={() =>
          wishDispatch({
            type: "ADD_WISH",
            payload: {
              wishItemDetails: {
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
              },
              setToast,
            },
          })
        }
        className="container--wish-icon"
      >
        {wishState.some((item) => item.id === id) ? (
          <i className="bi bi-heart-fill wish-icon-success-color"></i>
        ) : (
          <i className="bi bi-heart"></i>
        )}
      </div>
      <div className="product-card-content-container">
        <div className="product-card-img-container ">
          <img src={image} alt="" />
        </div>
        <div className="card-content product-card-content">
          <p>
            {brand} {name} ({color})
          </p>
          <p>
            ₹{price} <span style={{ color: "var(--rb-green)" }}>{offer}</span>
          </p>

          <p>{fastDelivery}</p>
          {ratings >= 4 && (
            <div className="star-num product-rating-star-num rating-h">
              <span>{ratings}</span> <i className="bi bi-star-fill"></i>
            </div>
          )}
          {ratings >= 2 && ratings < 4 && (
            <div className="star-num product-rating-star-num rating-m">
              <span>{ratings}</span> <i className="bi bi-star-fill"></i>
            </div>
          )}
          {ratings >= 0 && ratings < 2 && (
            <div className="star-num product-rating-star-num rating-l">
              <span>{ratings}</span> <i className="bi bi-star-fill"></i>
            </div>
          )}
          {inStock ? <p> In Stock </p> : <p> Out of Stock </p>}
          {fastDelivery ? <p> Fast Delivery </p> : <p> 3 days minimum </p>}
        </div>
      </div>
      <button
        onClick={() =>
          cartDispatch({
            type: "ADD_TO_CART",
            payload: {
              itemDetails: {
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
              },
            },
          })
        }
        className="btn primary add-to-cart-btn"
      >
        {cartState.some((item) => item.id === id) ? (
          <Link to="/cart" className="nav-links">
            Go to cart
          </Link>
        ) : (
          "Add to cart"
        )}
      </button>
    </div>
  );
};
export default ProductCard;
