import { Link } from "react-router-dom";
import DefaultWithoutSearch from "../../layouts/DefaultWithoutSearch";
import styles from "./Home.module.css";
import banner from "./Banner.jpg";

const Home = () => {
  return (
    <DefaultWithoutSearch>
      <header className={styles.banner}>
        <img className="image" src={banner} alt="Your wish" />
      </header>
      <Link to="/products" className="btn links btn-link">
        View Products
      </Link>
    </DefaultWithoutSearch>
  );
};
export default Home;
