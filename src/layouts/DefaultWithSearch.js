import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar/Navbar";

const DefaultWithSearch = ({ children, searchInput, setSearchInput }) => {
  return (
    <>
      <Navbar
        search={true}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <ToastContainer />
      {children}
    </>
  );
};

export default DefaultWithSearch;
