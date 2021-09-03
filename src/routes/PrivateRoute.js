import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const PrivateRoute = ({ path, ...rest }) => {
  const { token } = useAuth();

  return token ? (
    <Route {...rest} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/signin" />
  );
};

export default PrivateRoute;
