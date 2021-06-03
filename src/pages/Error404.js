import "../assets/css/error404.css";
import { Link } from "react-router-dom";
import { ReactComponent as Error404Svg } from "../assets/images/error404.svg";

const Error404 = () => {
  return (
    <div className="error-msg-container">
      <Error404Svg width="100%" />
      <div className="error-msg">
        <div className="error-msg-bold">YOU SEEM LOST</div>
        <div className="error-msg-take-home">
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
