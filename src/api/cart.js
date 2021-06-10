import axios from "axios";
import { BASE_URL, handleApiError } from "./helper";

const url = `${BASE_URL}/users/cart`;

const getCart = async () => {
  try {
    const { data } = await axios.get(`${url}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const addToCart = async (id, qty) => {
  try {
    const { data } = await axios.post(`${url}`, {
      productId: id,
      quantity: qty,
    });
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const updateCartItemQuantity = async (id, qty) => {
  try {
    const { data } = await axios.put(`${url}`, {
      productId: id,
      quantity: qty,
    });
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const updateCart = async (cart) => {
  try {
    const { data } = await axios.post(`${url}/sync`, cart);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

export { getCart, addToCart, updateCartItemQuantity, updateCart };
