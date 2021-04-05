import { Link } from "react-router-dom";
import { useWish } from "../contexts/wishlist-context";
import WishCard from "./WishCard";

const WishList = () => {
  const { wishState, wishDispatch } = useWish();
  return (
    <div className="wish-container">
      <h3 className="wishlist-header">My Wishlist</h3>
      {wishState.length > 0 ? (
        <div className="wish-card-container">
          {wishState.map((item) => (
            <WishCard item={item} wishDispatch={wishDispatch} />
          ))}
        </div>
      ) : (
        <div className="empty-wish-container">
          <div className="empty-wish-image-container">
            <img
              className="image"
              src="images/empty-wish-image.svg"
              alt="Your wish"
            />
          </div>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              padding: "1rem 2rem",
            }}
          >
            You haven't added any products yet
          </p>
          <p>Click ❤️ to save products</p>
          <button className="btn primary">
            <Link to="/product-listing" className="nav-links">
              Find items to save
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};
export default WishList;
