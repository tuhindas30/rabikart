import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar/Navbar";

const DefaultWithoutSearch = ({ children }) => {
  return (
    <>
      <Navbar />
      <ToastContainer />
      {children}
    </>
  );
};

export default DefaultWithoutSearch;
