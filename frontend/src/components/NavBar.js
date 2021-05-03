import "../assets/css/NavBar.css";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/cart-context";
import { useWish } from "../contexts/wishlist-context";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";

const NavBar = () => {
  const { cartState } = useCart();
  const { wishState } = useWish();

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="nav-links">
            <h1>RabiKart</h1>
          </Link>
        </div>
        <div className="search-desktop">
          <input
            // onChange={(e) => setSearchInput(e.target.value)}
            className="search-box"
            type="text"
            placeholder="Search for products"
          />
        </div>
        <div className="nav-right">
          <Link to="/wishlist" className="nav-links badge-icon flex-icon">
            <FaHeart />
            {wishState.length > 0 && (
              <span className="badge-i small">{wishState.length}</span>
            )}
          </Link>
          <Link to="/cart" className="nav-links badge-icon flex-icon">
            <FaShoppingCart />
            {cartState.length > 0 && (
              <span className="badge-i small">{cartState.length}</span>
            )}
          </Link>
          <Link to="/cart" className="nav-links badge-icon flex-icon">
            <FaUserCircle />
          </Link>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
