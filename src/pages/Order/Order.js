import DefaultWithoutSearch from "../../layouts/DefaultWithoutSearch";
import { useOrder } from "../../contexts/OrderProvider";
import NavTabs from "../../components/NavTabs/NavTabs";
import OrderItem from "../../components/OrderItem/OrderItem";
import { ReactComponent as EmptyProductImage } from "../../assets/images/EmptyProductImage.svg";
import styles from "./Order.module.css";

const Order = () => {
  const { isOrderLoading, orderState } = useOrder();

  if (isOrderLoading) {
    return (
      <DefaultWithoutSearch>
        <h1 className="overlay">Loading ...</h1>
      </DefaultWithoutSearch>
    );
  }

  if (orderState.length === 0) {
    return (
      <DefaultWithoutSearch>
        <NavTabs />
        <div className={styles.emptyOrderContainer}>
          <EmptyProductImage width="80%" />
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              padding: "1rem 2rem",
            }}>
            No orders here!
          </p>
        </div>
      </DefaultWithoutSearch>
    );
  }

  return (
    <DefaultWithoutSearch>
      <NavTabs />
      <div className={styles.card}>
        <div className={styles.products}>
          {orderState.map((order) => (
            <div key={order._id}>
              {order.items.map((item) => (
                <OrderItem key={item.product._id} order={order} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </DefaultWithoutSearch>
  );
};

export default Order;
