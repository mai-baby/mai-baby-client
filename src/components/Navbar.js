import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <NavLink to="/">
        <button>Home</button>
      </NavLink>
      <NavLink to="/products">
        <button>Products</button>
      </NavLink>
      {/* UPDATE: Add Shopping Cart or Orders!! */}
      <NavLink to="/order">
        <button>My Orders</button>
      </NavLink>

      {isLoggedIn && (
        <>
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <NavLink to="/register">
            <button>Sign Up</button>
          </NavLink>
          <NavLink to="/login">
            <button>Login</button>
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default Navbar;
