import { createContext, useContext } from "react";
import { useState } from "react";

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    display: false,
    addedOrRemoved: "",
    fromComponent: "",
  });

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
    </ToastContext.Provider>
  );
};
const useToast = () => {
  return useContext(ToastContext);
};

export { ToastProvider, useToast };
