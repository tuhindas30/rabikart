import { Link } from "react-router-dom";
import { useWishlist } from "../../contexts/WishlistProvider";
import DefaultWithoutSearch from "../../layouts/DefaultWithoutSearch";
import WishCard from "../../components/WishCard/WishCard";
import { ReactComponent as EmptyWishSvg } from "./EmptyWishImage.svg";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";
import styles from "./Wishlist.module.css";

const Wishlist = () => {
  const { isWishlistLoading, wishlistState } = useWishlist();

  if (isWishlistLoading) {
    return (
      <DefaultWithoutSearch>
        <div className="overlay">
          <Loader />
        </div>
      </DefaultWithoutSearch>
    );
  }

  if (wishlistState.length <= 0) {
    return (
      <DefaultWithoutSearch>
        <div className={styles.emptyWishContainer}>
          <EmptyWishSvg width="80%" />
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              padding: "1rem 2rem",
            }}>
            You haven't added any products yet
          </p>
          <p>Click ❤️ to save products</p>
          <Link to="/products" className="btn links btn-link">
            Find items to save
          </Link>
        </div>
      </DefaultWithoutSearch>
    );
  }
  return (
    <DefaultWithoutSearch>
      <div className={styles.wishContainer}>
        <h3 className={styles.wishlistHeader}>My Wishlist</h3>
        <div className={styles.wishCardContainer}>
          {wishlistState.map(({ product }) => (
            <WishCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </DefaultWithoutSearch>
  );
};
export default Wishlist;
