import axios from "axios";
import { useEffect } from "react";
import { useProducts } from "./contexts/products-context";

const Data = () => {
  const { productsData, setProductsData } = useProducts();
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { products },
        } = await axios.get("/api/products");
        setProductsData(products);
      } catch (error) {
        console.log(error);
      }
    })();
    return async () =>
      await axios.get("/api/products", {
        cancelToken: axios.CancelToken.source().token,
      });
  }, []);
  return productsData;
};
export default Data;
