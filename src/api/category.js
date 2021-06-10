import axios from "axios";
import { BASE_URL, handleApiError } from "./helper";

const url = `${BASE_URL}/categories`;

const getAllCategories = async () => {
  try {
    const { data } = await axios.get(`${url}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const getCategoryById = async (categoryId) => {
  try {
    const { data } = await axios.get(`${url}/${categoryId}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const createNewCategory = async (name) => {
  try {
    const { data } = await axios.post(`${url}`, {
      title: name,
    });
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const updateCategoryById = async (categoryId, newName) => {
  try {
    const { data } = await axios.post(`${url}/${categoryId}`, {
      title: newName,
    });
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const deleteCategoryById = async (categoryId) => {
  try {
    const { data } = await axios.delete(`${url}/${categoryId}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

export {
  getAllCategories,
  getCategoryById,
  createNewCategory,
  updateCategoryById,
  deleteCategoryById,
};
