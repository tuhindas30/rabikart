import axios from "axios";
import { BASE_URL, handleApiError } from "./helper";

const url = `${BASE_URL}/products`;

const getAllProducts = async () => {
  try {
    const { data } = await axios.get(`${url}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const getProductById = async (productId) => {
  try {
    const { data } = await axios.get(`${url}/${productId}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const createNewProduct = async (productData) => {
  try {
    const { data } = await axios.post(`${url}`, productData);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const updateProductById = async (productId, updateData) => {
  try {
    const { data } = await axios.post(`${url}/${productId}`, updateData);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const deleteProductById = async (productId) => {
  try {
    const { data } = await axios.delete(`${url}/${productId}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

export {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProductById,
  deleteProductById,
};
