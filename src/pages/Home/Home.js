import { Link } from "react-router-dom";
import DefaultWithoutSearch from "../../layouts/DefaultWithoutSearch";
import { useProducts } from "../../contexts/ProductsProvider";
import Footer from "../../components/Footer/Footer";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";
import banner from "./Banner.webp";
import allCategory from "./AllCategory.webp";
import category1 from "./Category1.webp";
import category2 from "./Category2.webp";
import loginImg from "./LoginImg.webp";
import styles from "./Home.module.css";

const Home = () => {
  const { isProductsLoading, categories } = useProducts();
  const styleObj = [
    { position: "topRight", image: category1 },
    { position: "bottomLeft", image: category2 },
    { position: "bottomRight", image: loginImg },
  ];

  if (isProductsLoading) {
    return (
      <DefaultWithoutSearch>
        <div className="overlay">
          <Loader />
        </div>
      </DefaultWithoutSearch>
    );
  }

  return (
    <DefaultWithoutSearch>
      <header className={styles.header}>
        <div className={styles.banner}>
          <img src={banner} alt="RabiKart" className="image" />
        </div>
        <div className={styles.categories}>
          <Link
            to="/products"
            className={`${styles.link} ${styles.topLeft} ${styles.categoryImg}`}>
            <div className={`overlay ${styles.categoryOverlay}`}>
              View all products
            </div>
            <img className="image" src={allCategory} alt="View All Products" />
          </Link>
          {categories.map(({ _id, title }, index) => (
            <Link
              to={`/categories/${_id}`}
              key={_id}
              className={`${styles.link} ${styleObj[index].position} ${styles.categoryImg}`}>
              <div className={`overlay ${styles.categoryOverlay}`}>{title}</div>
              <img className="image" src={styleObj[index].image} alt={title} />
            </Link>
          ))}
          <Link
            to="/signin"
            className={`${styles.link} ${styles.bottomRight} ${styles.categoryImg}`}>
            <div className={`overlay ${styles.categoryOverlay}`}>
              Login and access more features!
            </div>
            <img
              className="image"
              src={loginImg}
              alt="Login and access more features!"
            />
          </Link>
        </div>
      </header>
      <Footer />
    </DefaultWithoutSearch>
  );
};
export default Home;
