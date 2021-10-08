import axios from "axios";
import { BASE_URL, handleApiError } from "./helper";

const url = `${BASE_URL}/users/wishlist`;

const getWishlist = async () => {
  try {
    const { data } = await axios.get(`${url}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const addToWishlist = async (id) => {
  try {
    const { data } = await axios.post(`${url}`, {
      productId: id,
    });
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const removeFromWishlist = async (productId) => {
  try {
    const { data } = await axios.delete(`${url}/${productId}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

export { getWishlist, addToWishlist, removeFromWishlist };
