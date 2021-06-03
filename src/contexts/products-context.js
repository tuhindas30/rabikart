import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import productReducer from "../reducers/productReducer";
const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]);
  const [
    { showOutOfStock, showFastDelivery, sortBy },
    productDispatch,
  ] = useReducer(productReducer, {
    showOutOfStock: true,
    showFastDelivery: false,
    sortBy: null,
  });

  useEffect(() => {
    const source = axios.CancelToken.source();
    (async () => {
      try {
        const {
          data: { products },
        } = await axios.get("https://rabikart.tuhindas5.repl.co/products", {
          cancelToken: source.token,
        });
        setProductsData(products);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      source.cancel("Component got unmounted");
    };
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        productsData,
        setProductsData,
        showOutOfStock,
        showFastDelivery,
        sortBy,
        productDispatch,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = () => {
  return useContext(ProductsContext);
};

export { ProductsProvider, useProducts };
