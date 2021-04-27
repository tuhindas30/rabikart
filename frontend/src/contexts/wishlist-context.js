import { createContext, useContext, useReducer } from "react";
import wishReducer from "../reducers/wishReducer";

const WishContext = createContext();

const WishProvider = ({ children }) => {
  const [wishState, wishDispatch] = useReducer(wishReducer, []);
  return (
    <WishContext.Provider value={{ wishState, wishDispatch }}>
      {children}
    </WishContext.Provider>
  );
};

const useWish = () => {
  return useContext(WishContext);
};
export { WishProvider, useWish };
