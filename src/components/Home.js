import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="empty-wish-container">
      <div className="empty-wish-image-container">
        <img className="image" src="images/home.svg" alt="Your wish" />
      </div>
      <button className="btn primary">
        <Link to="/product" className="nav-links">
          View Products
        </Link>
      </button>
    </div>
  );
};
export default Home;
