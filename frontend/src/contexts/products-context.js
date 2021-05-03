import { createContext, useContext, useReducer, useState } from "react";
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
