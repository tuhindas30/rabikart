import { createContext, useContext, useReducer, useState } from "react";
import productReducer from "../reducers/productReducer";
const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]);
  const [productState, productDispatch] = useReducer(productReducer, {
    showOutOfStock: true,
    showFastDelivery: false,
    sortBy: null,
  });
  return (
    <ProductsContext.Provider
      value={{
        productsData,
        setProductsData,
        productState,
        productDispatch,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = () => {
  return useContext(ProductsContext);
};

export { ProductsProvider, useProducts };
