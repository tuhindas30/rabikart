import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import productReducer from "../reducers/productReducer";
import * as productApi from "../api/product";
import * as categoryApi from "../api/category";
const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [isProductsLoading, setProductsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const initialState = {
    isOutOfStock: false,
    isFastDeliveryAvailable: false,
    isTopRated: false,
    isTopSeller: false,
    sortBy: null,
    priceRange: "14999",
  };
  const [
    {
      isOutOfStock,
      isFastDeliveryAvailable,
      isTopRated,
      isTopSeller,
      sortBy,
      priceRange,
    },
    productlistDispatch,
  ] = useReducer(productReducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        setProductsLoading(true);
        const { data } = await productApi.getAllProducts();
        setProducts(data);
      } catch (err) {
        setProducts([]);
      } finally {
        setProductsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setProductsLoading(true);
        const { data } = await categoryApi.getAllCategories();
        setCategories(data);
      } catch (err) {
        setCategories([]);
      } finally {
        setProductsLoading(false);
      }
    })();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        isProductsLoading,
        products,
        productlistDispatch,
        categories,
        isOutOfStock,
        isFastDeliveryAvailable,
        isTopRated,
        isTopSeller,
        sortBy,
        priceRange,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = () => useContext(ProductsContext);

export { ProductsProvider, useProducts };
