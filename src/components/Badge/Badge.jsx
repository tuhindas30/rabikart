import styles from "./Badge.module.css";

const Badge = ({ children }) => {
  return <span className={`badge-i ${styles.badgeSmall}`}>{children}</span>;
};

export default Badge;
