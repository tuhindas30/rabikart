import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useAuth } from "./AuthProvider";
import * as cartApi from "../api/cart";
import cartReducer from "../reducers/cartReducer";
import showToast from "../utils/showToast";
import axios from "axios";
import { setupCancelToken } from "../utils/helper";
import { useNavigate } from "react-router";
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const localCart = JSON.parse(localStorage?.getItem("__cart")) || {
    totalPrice: 0,
    items: [],
  };
  const [cartState, cartDispatch] = useReducer(cartReducer, localCart);
  const [isCartLoading, setCartLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();
  const source = axios.CancelToken.source();
  setupCancelToken(source);

  useEffect(() => {
    if (token) {
      (async () => {
        await doesLocalCartHasItems(localCart, cartDispatch);
      })();
    } else {
      cartDispatch({
        type: "INITIALISE_CART",
        payload: { cart: localCart },
      });
    }
    return () => source.cancel("cart unmounted");
  }, [token]);

  const syncCartFromServer = async (localCartItems, cartDispatch) => {
    try {
      setCartLoading(true);
      const response = await cartApi.updateCart(localCartItems);
      if (response.status === "SUCCESS") {
        cartDispatch({
          type: "INITIALISE_CART",
          payload: {
            cart: {
              totalPrice: response.data.totalPrice,
              items: response.data.items,
            },
          },
        });
        localStorage?.setItem(
          "__cart",
          JSON.stringify({ totalPrice: 0, items: [] })
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setCartLoading(false);
    }
  };

  const getCartFromServer = async (cartDispatch) => {
    try {
      setCartLoading(true);
      const response = await cartApi.getCart();
      if (response.status === "SUCCESS") {
        cartDispatch({
          type: "INITIALISE_CART",
          payload: {
            cart: {
              totalPrice: response.data.totalPrice,
              items: response.data.items,
            },
          },
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setCartLoading(false);
    }
  };

  const doesLocalCartHasItems = async (localCart, cartDispatch) => {
    if (localCart.items.length > 0) {
      await syncCartFromServer(localCart.items, cartDispatch);
    } else {
      await getCartFromServer(cartDispatch);
    }
  };

  const addToCartLocally = (product, qty) => {
    let localCart = JSON.parse(localStorage?.getItem("__cart"));
    if (localCart) {
      const totalPrice = localCart.totalPrice + product.discountPrice;
      localCart.items.push({ product, quantity: qty });
      localStorage?.setItem(
        "__cart",
        JSON.stringify({
          totalPrice,
          items: localCart.items,
        })
      );
    } else {
      localStorage?.setItem(
        "__cart",
        JSON.stringify({
          totalPrice: product.discountPrice,
          items: [{ product, quantity: qty }],
        })
      );
    }
    localCart = JSON.parse(localStorage?.getItem("__cart"));
    cartDispatch({
      type: "ADD_TO_CART",
      payload: {
        cart: localCart,
      },
    });
    showToast("Product added to cart successfully");
    navigate("/cart");
  };

  const addToCartServer = async (productId, qty) => {
    try {
      setCartLoading(true);
      const response = await cartApi.addToCart(productId, qty);
      if (response.status === "SUCCESS") {
        cartDispatch({
          type: "ADD_TO_CART",
          payload: {
            cart: {
              totalPrice: response.data.totalPrice,
              items: response.data.items,
            },
          },
        });
        navigate("/cart");
      }
    } catch (err) {
      showToast("Something went wrong. Please try again :)");
      console.log(err);
    } finally {
      setCartLoading(false);
    }
  };

  const addToCart = async (product, productId, qty = 1) => {
    if (token) {
      await addToCartServer(productId, qty);
    } else {
      addToCartLocally(product, qty);
    }
  };

  const changeCartItemQuantityServer = async (productId, quantity) => {
    try {
      setCartLoading(true);
      const response = await cartApi.updateCartItemQuantity(
        productId,
        quantity
      );
      if (response.status === "SUCCESS") {
        cartDispatch({
          type: "CHANGE_QUANTITY",
          payload: {
            cart: {
              totalPrice: response.data.totalPrice,
              items: response.data.items,
            },
          },
        });
      }
      return response;
    } catch (err) {
      console.log(err.message);
      if (err.response.status === 400) {
        alert(`Session Expired\nPlease sign-in again`);
      } else {
        showToast("Something went wrong. Please try again :)");
      }
    } finally {
      setCartLoading(false);
    }
  };

  const increaseCartItemQuantityLocally = (productId) => {
    let localCart = JSON.parse(localStorage?.getItem("__cart"));
    const itemIndex = localCart.items.findIndex(
      (item) => item.product._id === productId
    );
    if (itemIndex > -1) {
      localCart.items[itemIndex].quantity += 1;
      const totalPrice = localCart.items.reduce(
        (acc, curr) => acc + curr.product.discountPrice * curr.quantity,
        0
      );
      localStorage?.setItem(
        "__cart",
        JSON.stringify({ totalPrice, items: localCart.items })
      );
      localCart = JSON.parse(localStorage?.getItem("__cart"));
    }
    cartDispatch({
      type: "CHANGE_QUANTITY",
      payload: {
        cart: localCart,
      },
    });
    showToast("Product quantity increased by 1 successfully");
  };

  const increaseCartItemQuantity = async (productId, quantity) => {
    if (token) {
      const response = await changeCartItemQuantityServer(
        productId,
        quantity + 1
      );
      if (response.status === "SUCCESS") {
        showToast("Product quantity increased by 1 successfully");
      }
    } else {
      increaseCartItemQuantityLocally(productId);
    }
  };

  const decreaseCartItemQuantityLocally = (productId) => {
    let localCart = JSON.parse(localStorage?.getItem("__cart"));
    const itemIndex = localCart.items.findIndex(
      (item) => item.product._id === productId
    );
    if (itemIndex > -1) {
      localCart.items[itemIndex].quantity -= 1;
      const totalPrice = localCart.items.reduce(
        (acc, curr) => acc + curr.product.discountPrice * curr.quantity,
        0
      );
      localStorage?.setItem(
        "__cart",
        JSON.stringify({ totalPrice, items: localCart.items })
      );
      localCart = JSON.parse(localStorage?.getItem("__cart"));
      showToast("Product quantity decreased by 1 successfully");
    }
    cartDispatch({
      type: "CHANGE_QUANTITY",
      payload: {
        cart: localCart,
      },
    });
  };

  const decreaseCartItemQuantity = async (productId, quantity) => {
    if (token) {
      const response = await changeCartItemQuantityServer(
        productId,
        quantity - 1
      );
      if (response.status === "SUCCESS") {
        showToast("Product quantity decreased by 1 successfully");
      }
    } else {
      decreaseCartItemQuantityLocally(productId, quantity);
    }
  };

  const removeFromCartLocally = (productId) => {
    let localCart = JSON.parse(localStorage?.getItem("__cart"));
    const itemIndex = localCart.items.findIndex(
      (item) => item.product._id === productId
    );
    if (itemIndex > -1) {
      localCart.items.splice(itemIndex, 1);
      const totalPrice = localCart.items.reduce(
        (acc, curr) => acc + curr.product.discountPrice * curr.quantity,
        0
      );
      localStorage?.setItem(
        "__cart",
        JSON.stringify({ totalPrice, items: localCart.items })
      );
      localCart = JSON.parse(localStorage?.getItem("__cart"));
    }
    cartDispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        cart: localCart,
      },
    });
    showToast("Product removed from cart successfully");
  };

  const removeFromCartServer = async (productId) => {
    try {
      setCartLoading(true);
      const response = await cartApi.updateCartItemQuantity(productId, 0);
      if (response.status === "SUCCESS") {
        cartDispatch({
          type: "REMOVE_FROM_CART",
          payload: {
            cart: {
              totalPrice: response.data.totalPrice,
              items: response.data.items,
            },
          },
        });
        showToast("Product removed from cart successfully");
      }
    } catch (err) {
      showToast("Something went wrong. Please try again :)");
      console.log(err.message);
    } finally {
      setCartLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (token) {
      await removeFromCartServer(productId);
    } else {
      removeFromCartLocally(productId);
    }
  };

  return (
    <CartContext.Provider
      value={{
        isCartLoading,
        addToCart,
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
        removeFromCart,
        cartState,
      }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
