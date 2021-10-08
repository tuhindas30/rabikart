import axios from "axios";

const setupAuthHeader = (token) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);
  }
  delete axios.defaults.headers.common["Authorization"];
};

const setupAuthExceptionHandler = (logoutUser, navigate) => {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        logoutUser();
        navigate("/signin");
      }
      return Promise.reject(error);
    }
  );
};

export { setupAuthHeader, setupAuthExceptionHandler };
