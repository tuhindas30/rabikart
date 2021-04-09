import "../assets/css/NavBar.css";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/cart-context";
import { useWish } from "../contexts/wishlist-context";

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
        <div className="nav-right">
          <Link to="/wishlist" className="nav-links badge-icon">
            <i className="bi bi-heart-fill"></i>
            {wishState.length > 0 && (
              <span className="badge-i small">{wishState.length}</span>
            )}
          </Link>
          <Link to="/cart" className="nav-links badge-icon">
            <i className="bi bi-cart3"></i>
            {cartState.length > 0 && (
              <span className="badge-i small">{cartState.length}</span>
            )}
          </Link>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
