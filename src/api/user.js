import axios from "axios";
import { BASE_URL, handleApiError } from "../api/helper";

const url = `${BASE_URL}/users`;

const getUserById = async (userId) => {
  try {
    const { data } = await axios.get(`${url}/${userId}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const updateUserById = async (userId, emailId) => {
  try {
    const { data } = await axios.post(`${url}/${userId}`, {
      email: emailId,
    });
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const deleteUserById = async (userId) => {
  try {
    const { data } = await axios.delete(`${url}/${userId}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

export { getUserById, updateUserById, deleteUserById };
