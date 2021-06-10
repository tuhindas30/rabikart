import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (toastMessage) => {
  return toast.dark(toastMessage, {
    position: "bottom-center",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export default showToast;
