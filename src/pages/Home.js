import "../assets/css/Home.css";
import { Link } from "react-router-dom";
import data from "../Data";
const Home = () => {
  data();
  return (
    <>
      <header className="banner">
        <img className="image" src="images/banner.jpg" alt="Your wish" />
      </header>
      <div className="category-grid">
        <Link to="/product-listing/men">
          <div className="category">Men</div>
        </Link>
        <Link to="/product-listing/women">
          <div className="category">Women</div>
        </Link>
        <Link to="/product-listing/boys">
          <div className="category">Boys</div>
        </Link>
        <Link to="/product-listing/girls">
          <div className="category">Girls</div>
        </Link>
        <Link to="/product-listing/senior">
          <div className="category">Senior</div>
        </Link>
        <Link to="/product-listing/beginner">
          <div className="category">Beginner</div>
        </Link>
        <Link to="/product-listing/amateur">
          <div className="category">Amateur</div>
        </Link>
        <Link to="/product-listing/intermediate">
          <div className="category">Intermediate</div>
        </Link>
        <Link to="/product-listing/advanced">
          <div className="category">Advanced</div>
        </Link>
        <Link to="/product-listing/professional">
          <div className="category">Professional</div>
        </Link>
      </div>
      <button className="btn primary">
        <Link to="/product-listing" className="nav-links">
          View Products
        </Link>
      </button>
    </>
  );
};
export default Home;
