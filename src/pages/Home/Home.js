import { Link } from "react-router-dom";
import DefaultWithoutSearch from "../../layouts/DefaultWithoutSearch";
import styles from "./Home.module.css";
import banner1 from "./Banner1.jpg";
import banner2 from "./Banner2.jpg";
import signinBanner from "./SigninBanner.jpg";
import allCategoryBanner from "./AllCategoryBanner.jpg";
import { useProducts } from "../../contexts/ProductsProvider";
import { useState } from "react";

const Home = () => {
  const { isProductsLoading, categories } = useProducts();
  const styleObj = [
    { position: "topRight", image: banner1 },
    { position: "bottomLeft", image: banner2 },
    { position: "bottomRight", image: signinBanner },
  ];

  if (isProductsLoading) {
    return (
      <DefaultWithoutSearch>
        <h1 className="overlay">Loading ...</h1>
      </DefaultWithoutSearch>
    );
  }

  return (
    <DefaultWithoutSearch>
      <header className={styles.headerGrid}>
        <Link
          to="/products"
          className={`${styles.link} ${styles.topLeft} ${styles.banner}`}>
          <div className={`overlay ${styles.categoryOverlay}`}>
            View all products
          </div>
          <img className="image" src={allCategoryBanner} alt="" />
        </Link>
        {categories.map(({ _id, title }, index) => (
          <Link
            to={`/categories/${_id}`}
            key={_id}
            className={`${styles.link} ${styleObj[index].position} ${styles.banner}`}>
            <div className={`overlay ${styles.categoryOverlay}`}>{title}</div>
            <img className="image" src={styleObj[index].image} alt="" />
          </Link>
        ))}
        <Link
          to="/signin"
          className={`${styles.link} ${styles.bottomRight} ${styles.banner}`}>
          <div className={`overlay ${styles.categoryOverlay}`}>
            Login and access more features!
          </div>
          <img className="image" src={signinBanner} alt="" />
        </Link>
      </header>
    </DefaultWithoutSearch>
  );
};
export default Home;
