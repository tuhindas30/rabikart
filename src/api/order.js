import axios from "axios";
import { BASE_URL, handleApiError } from "./helper";

const url = `${BASE_URL}/users/orders`;

const getOrders = async () => {
  try {
    const { data } = await axios.get(`${url}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const initiateOrder = async (orderData) => {
  try {
    const { data } = await axios.post(`${url}`, orderData);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const confirmOrder = async (orderId, paymentDetails) => {
  const { razorpay_payment_id, razorpay_signature } = paymentDetails;
  try {
    const { data } = await axios.post(`${url}/${orderId}/confirm`, {
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

export { getOrders, initiateOrder, confirmOrder };
