import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = () => {
  const { isAuthenticated } = useSelector((state) => state.authorize);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (location.pathname === "/login" || location.pathname === "/signup") {
        navigate("/", { replace: true });
      }
    }
  }, [navigate, location, isAuthenticated]);

  return <></>;
};

export default RefreshHandler;
