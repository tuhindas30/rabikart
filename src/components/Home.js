import { Link } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import data from "../Data";
const Home = () => {
  const productsData = data();
  const getImages = () => {
    return productsData.map((item) => item.image);
  };
  console.log(getImages(productsData));
  return (
    <div className="empty-wish-container">
      {/* <div className="empty-wish-image-container">
        <img className="image" src="images/home.svg" alt="Your wish" />
      </div> */}
      <ImageSlider getImages={getImages} />
      <button className="btn primary">
        <Link to="/product-listing" className="nav-links">
          View Products
        </Link>
      </button>
    </div>
  );
};
export default Home;
