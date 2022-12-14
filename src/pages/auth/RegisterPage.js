import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, username };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/register`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="RegisterPage wrapper">
      <form id="formContent" onSubmit={handleRegisterSubmit}>
        <input
          id="login"
          type="text"
          name="username"
          value={username}
          placeholder="Username"
          onChange={handleUsername}
        />
        <input
          id="register"
          type="text"
          name="email"
          value={email}
          placeholder="email@address.com"
          onChange={handleEmail}
        />

        <input
          id="password"
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={handlePassword}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button id="register-button" type="submit">
          Register
        </button>
      </form>

      <div id="formFooter">
        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    </div>
  );
}

export default RegisterPage;
