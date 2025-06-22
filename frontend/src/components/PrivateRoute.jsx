import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);

    if (!user || !user.token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;