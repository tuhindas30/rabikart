import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartProvider";
import { useWishlist } from "../../contexts/WishlistProvider";
import { useAuth } from "../../contexts/AuthProvider";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import Badge from "../Badge/Badge";
import NavSearch from "../NavSearch/NavSearch";
import styles from "./Navbar.module.css";

const Navbar = ({ search = false, searchInput = "", setSearchInput }) => {
  const { token, signout } = useAuth();
  const { cartState } = useCart();
  const { wishlistState } = useWishlist();

  return (
    <nav className={`navbar ${styles.navbar}`}>
      <div className={`nav-left ${styles.navLeft}`}>
        <Link to="/" className={`${styles.navLinks} ${styles.navBrand}`}>
          RabiKart
        </Link>
      </div>
      {search && <NavSearch input={searchInput} onInput={setSearchInput} />}
      <div className={`nav-right ${styles.navRight}`}>
        <Link
          to="/wishlist"
          className={`${styles.navLinks} badge-icon flex-icon`}>
          <FaHeart />
          {wishlistState.length > 0 && (
            <Badge children={wishlistState.length} />
          )}
        </Link>
        <Link to="/cart" className={`${styles.navLinks} badge-icon flex-icon`}>
          <FaShoppingCart />
          {cartState.items.length > 0 && (
            <Badge children={cartState.items.length} />
          )}
        </Link>
        {token ? (
          <Link
            to="/user"
            className={`${styles.navLinks} badge-icon flex-icon`}>
            <FaUserCircle />
          </Link>
        ) : (
          <Link
            to="/signin"
            className={`btn links btn-link ${styles.signinBtn}`}>
            SIGNIN
          </Link>
        )}
        {token && (
          <button
            className={`btn secondary ${styles.signoutBtn}`}
            onClick={signout}>
            Signout
          </button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
