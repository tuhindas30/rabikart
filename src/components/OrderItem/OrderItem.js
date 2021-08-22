import styles from "./OrderItem.module.css";

const OrderItem = ({ order, item }) => {
  return (
    <div className={styles.orderItem}>
      <img
        className={`image ${styles.image}`}
        src={item.product.imageUrl}
        alt={item.product.modelName}
      />
      <div className={styles.orderDetails}>
        <h3>
          {item.product.modelName} x {item.quantity}
        </h3>
        <div>Price: ₹ {item.product.discountPrice * item.quantity}</div>
        <div>Seller: {item.product.seller}</div>
        <div style={{ marginTop: "1rem" }}>
          <h3>Payment</h3>
          <div>Order ID: {order.payment.orderId}</div>
          <div>Payment ID: {order.payment.paymentId}</div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <h3>Delivery</h3>
          <div>Name: {order.shipping.name}</div>
          <div>Street: {order.shipping.street}</div>
          <div>City: {order.shipping.city}</div>
          <div>State: {order.shipping.state}</div>
          <div>Pin: {order.shipping.pin}</div>
          <div>Contact: {order.shipping.contactNo}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
