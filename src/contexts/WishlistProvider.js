import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useAuth } from "./AuthProvider";
import wishlistReducer from "../reducers/wishlistReducer";
import * as wishApi from "../api/wishlist";
import showToast from "../utils/showToast";

const WishContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlistState, wishlistDispatch] = useReducer(wishlistReducer, []);
  const [isWishlistLoading, setWishlistLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          setWishlistLoading(true);
          const response = await wishApi.getWishlist();
          if (response.status === "SUCCESS") {
            wishlistDispatch({
              type: "INITIALISE_WISHLIST",
              payload: { items: response.data.items },
            });
          }
        } catch (err) {
        } finally {
          setWishlistLoading(false);
        }
      })();
    } else {
      wishlistDispatch({ type: "INITIALISE_WISHLIST", payload: { items: [] } });
    }
  }, [token]);

  const addToWishlist = async (productId) => {
    if (token) {
      try {
        const response = await wishApi.addToWishlist(productId);
        if (response.status === "SUCCESS") {
          wishlistDispatch({
            type: "ADD_TO_WISHLIST",
            payload: { items: response.data.items },
          });
          showToast("Product added to wishlist successfully");
        }
      } catch (err) {
        showToast("Something went wrong. Please try again :)");
      }
    } else {
      alert("Login to add product to wishlist");
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await wishApi.removeFromWishlist(productId);
      if (response.status === "SUCCESS") {
        wishlistDispatch({
          type: "REMOVE_FROM_WISHLIST",
          payload: { items: response.data.items },
        });
        showToast("Product removed from wishlist successfully");
      }
    } catch (err) {
      showToast("Something went wrong. Please try again :)");
    }
  };

  return (
    <WishContext.Provider
      value={{
        isWishlistLoading,
        wishlistState,
        addToWishlist,
        removeFromWishlist,
      }}>
      {children}
    </WishContext.Provider>
  );
};

const useWishlist = () => useContext(WishContext);

export { WishlistProvider, useWishlist };
