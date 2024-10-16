import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // const [isToken, setIsToken] = useState(true);
  const token = Cookies.get('token');
  
  console.log("Token", token,Cookies);

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
