import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useCart } from "../contexts/cart-context";
import { useProducts } from "../contexts/products-context";
import { useToast } from "../contexts/toast-context";
import { useWish } from "../contexts/wishlist-context";

const Product = () => {
  const { productId } = useParams();
  const { productsData } = useProducts();
  const { wishState, wishDispatch } = useWish();
  const { cartState, cartDispatch } = useCart();
  const { setToast } = useToast();
  const {
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
    material,
    level,
    idealFor,
  } = productsData.filter((product) => product.id === productId)[0];
  return (
    <>
      <div className="product-image">
        <img className="image" src={image} alt="" />
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
            <i className="bi bi-heart-fill wish-icon"></i>
          )}
        </div>
      </div>
      <div className="product-details">
        <h3>
          {brand} {name} ({color})
        </h3>
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
        <h2>
          ₹{price} <span style={{ color: "var(--rb-green)" }}>{offer}</span>
        </h2>
        {fastDelivery ? (
          <p> Fast Delivery </p>
        ) : (
          <p>Delivery: 3 days minimum </p>
        )}
        <p>Material: {material}</p>
        <p>Ideal for: {idealFor}</p>
        <p>Level: {level}</p>
      </div>
      <footer className="product-page-footer">
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
          className="btn secondary add-to-cart-btn"
        >
          {cartState.some((item) => item.id === id) ? (
            <Link to="/cart" className="nav-links">
              GO TO CART
            </Link>
          ) : (
            "ADD TO CART"
          )}
        </button>
        <button className="btn primary">BUY NOW</button>
      </footer>
    </>
  );
};
export default Product;
