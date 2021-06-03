import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import wishReducer from "../reducers/wishReducer";

const WishContext = createContext();

const WishProvider = ({ children }) => {
  const [wishState, wishDispatch] = useReducer(wishReducer, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    try {
      (async () => {
        const {
          data: { wishlist },
        } = await axios.get("https://rabikart.tuhindas5.repl.co/wishlist", {
          cancelToken: source.token,
        });
        wishDispatch({ type: "SET_WISH_DATA", payload: { wishlist } });
      })();
    } catch (error) {
      console.log(error);
    }
    return () => {
      source.cancel("Component got unmounted");
    };
  }, []);

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
