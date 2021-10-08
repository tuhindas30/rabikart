import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import orderReducer from "../reducers/orderReducer";
import * as orderApi from "../api/order";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const navigate = useNavigate();
  const [orderState, orderDispatch] = useReducer(orderReducer, []);
  const [isOrderLoading, setOrderLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          setOrderLoading(true);
          const response = await orderApi.getOrders();
          if (response.status === "SUCCESS") {
            orderDispatch({
              type: "INITIALISE_ORDER",
              payload: { items: response.data },
            });
          }
        } catch (err) {
        } finally {
          setOrderLoading(false);
        }
      })();
    } else {
      orderDispatch({ type: "INITIALISE_ORDER", payload: { items: [] } });
    }
  }, [token]);

  const initiateOrder = async (orderData) => {
    try {
      const response = await orderApi.initiateOrder({ shipping: orderData });
      if (response.status === "SUCCESS") {
        return response.data;
      }
    } catch (err) {}
  };

  const confirmOrder = async (orderId, paymentDetails) => {
    try {
      const response = await orderApi.confirmOrder(orderId, paymentDetails);
      if (response.status === "SUCCESS") {
        orderDispatch({
          type: "PLACE_ORDER",
          payload: { items: response.data },
        });
        navigate("/orders");
      }
    } catch (err) {}
  };

  return (
    <OrderContext.Provider
      value={{
        isOrderLoading,
        orderState,
        initiateOrder,
        confirmOrder,
      }}>
      {children}
    </OrderContext.Provider>
  );
};

const useOrder = () => useContext(OrderContext);

export { OrderProvider, useOrder };
