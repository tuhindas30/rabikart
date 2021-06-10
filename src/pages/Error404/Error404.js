import { Link } from "react-router-dom";
import styles from "./Error404.module.css";
import { ReactComponent as Error404Svg } from "./Error404.svg";

const Error404 = () => {
  return (
    <div className={styles.errorMsgContainer}>
      <Error404Svg width="100%" />
      <div className={styles.errorMsg}>
        <div className={styles.errorMsgBold}>YOU SEEM LOST</div>
        <div className={styles.errorMsgTakeHome}>
          That's okay, we know the way to home.
        </div>
      </div>
      <Link to="/">
        <button className="btn primary">TAKE ME HOME</button>
      </Link>
    </div>
  );
};
export default Error404;
