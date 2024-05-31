import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
