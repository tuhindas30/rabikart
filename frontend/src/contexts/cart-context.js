import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import cartReducer from "../reducers/cartReducer";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    try {
      (async () => {
        const {
          data: { cart },
        } = await axios.get("https://rabikart.tuhindas5.repl.co/cart", {
          cancelToken: source.token,
        });
        cartDispatch({ type: "SET_CART_DATA", payload: { cart } });
      })();
    } catch (error) {
      console.log(error);
    }
    return () => {
      source.cancel("Component got unmounted");
    };
  }, []);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};
export { CartProvider, useCart };
