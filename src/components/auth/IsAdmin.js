// src/components/IsPrivate.js

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";

function IsAdmin({ children }) {
  const { isLoading, user } = useContext(AuthContext);

  if (isLoading) return <Spinner animation="border" variant="primary" />;

  if (user?.isAdmin) {
    // If the user is not logged in, UPDATE send error message!!!
    return children;
  } else {
    return <Navigate to="/products" />;
  }
}

export default IsAdmin;
