// src/components/IsPrivate.js

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // UPDATE set spinner!!!
  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) {
    // If the user is not logged in, UPDATE send error message!!!
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default IsPrivate;
