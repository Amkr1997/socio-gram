import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useSelector((state) => state.authorize);

  return isAuthenticated ? element : <Navigate to={`/login`} />;
};

export default PrivateRoute;
