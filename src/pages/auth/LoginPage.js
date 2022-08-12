// src/pages/LoginPage.js

import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };
  return (
    <div className="LoginPage wrapper">
      <form id="formContent" onSubmit={handleLoginSubmit}>
        <input
          id="login"
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
          placeholder="Username"
        />

        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          placeholder="Password"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button id="login-button" type="submit">
          Login
        </button>
      </form>

      <div id="formFooter">
        <p>Don't have an account yet?</p>
        <Link to={"/signup"}>Sign Up</Link>
      </div>
    </div>
  );
}

export default LoginPage;
