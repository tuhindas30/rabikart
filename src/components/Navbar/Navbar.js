import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartProvider";
import { useWishlist } from "../../contexts/WishlistProvider";
import styles from "./Navbar.module.css";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthProvider";

const Navbar = ({ search = false, searchInput = "", setSearchInput }) => {
  const { token, signout } = useAuth();
  const { cartState } = useCart();
  const { wishlistState } = useWishlist();

  return (
    <>
      <nav className={`navbar ${styles.navbar}`}>
        <div className={`nav-left ${styles.navLeft}`}>
          <Link to="/" className={styles.navLinks}>
            <h1>RabiKart</h1>
          </Link>
        </div>
        {search && (
          <div className={styles.searchDesktop}>
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-box"
              type="text"
              placeholder="Search for products"
            />
          </div>
        )}
        <div className={`nav-right ${styles.navRight}`}>
          <Link
            to="/wishlist"
            className={`${styles.navLinks} badge-icon flex-icon`}>
            <FaHeart />
            {wishlistState.length > 0 && (
              <span className={`badge-i ${styles.small}`}>
                {wishlistState.length}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className={`${styles.navLinks} badge-icon flex-icon`}>
            <FaShoppingCart />
            {cartState.items.length > 0 && (
              <span className={`badge-i ${styles.small}`}>
                {cartState.items.length}
              </span>
            )}
          </Link>
          <Link
            to="/user"
            className={`${styles.navLinks} badge-icon flex-icon`}>
            <FaUserCircle />
          </Link>
          {token && (
            <button
              className={`btn secondary ${styles.signoutBtn}`}
              onClick={() => signout()}>
              Signout
            </button>
          )}
        </div>
      </nav>
    </>
  );
};
export default Navbar;
