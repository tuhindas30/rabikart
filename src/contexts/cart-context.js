import { createContext, useContext, useReducer } from "react";
import cartReducer from "../reducers/cartReducer";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, []);
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