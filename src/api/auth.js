import axios from "axios";
import { BASE_URL, handleApiError } from "./helper";

const url = `${BASE_URL}/auth`;

const signin = async (email, password) => {
  try {
    const { data } = await axios.post(`${url}/signin`, { email, password });
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const signup = async (username, email, password) => {
  try {
    const { data } = await axios.post(`${url}/signup`, {
      username,
      email,
      password,
    });
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const changePassword = async (oldPassword, newPassword) => {
  try {
    const { data } = await axios.post(`${url}/change-password`, {
      oldPassword,
      newPassword,
    });
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

export { signin, signup, changePassword };
