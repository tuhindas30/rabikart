import { NavLink } from "react-router-dom";
import { MdReorder } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import styles from "./NavTabs.module.css";

const NavTabs = () => {
  return (
    <nav className={styles.tabs}>
      <ul className={styles.navPills}>
        <li className={styles.item}>
          <FaUserCircle style={{ marginRight: "1rem" }} />
          <NavLink
            to="/user"
            className={styles.navLink}
            activeClassName={styles.active}>
            Account
          </NavLink>
        </li>
        <li className={styles.item}>
          <MdReorder style={{ marginRight: "1rem" }} />
          <NavLink
            to="/orders"
            className={styles.navLink}
            activeClassName={styles.active}>
            Orders
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavTabs;
