import "../assets/css/Home.css";
import { Link } from "react-router-dom";
import banner from "../assets/images/banner.jpg";

const Home = () => {
  return (
    <>
      <header className="banner">
        <img className="image" src={banner} alt="Your wish" />
      </header>
      <div className="btn-center">
        <button className="btn primary">
          <Link to="/product-listing" className="nav-links">
            View Products
          </Link>
        </button>
      </div>
    </>
  );
};
export default Home;
