import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSignOut } from "@fortawesome/free-solid-svg-icons";

function NavBar(props) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <Navbar className="px-5 nav-bg" sticky="top" expand="lg">
      <Navbar.Brand>
        <NavLink to="/">Mai-Baby</NavLink>
      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="ms-auto">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>

          {!isLoggedIn && (
            <>
              <NavLink to="/register">Sign Up</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          )}

          {isLoggedIn && (
            <>
              <NavLink to="/orders">Orders</NavLink>
              <NavLink to="/basket" id="cart">
                <FontAwesomeIcon icon={faShoppingCart} className="navicon" />{" "}
                {props.countCartItems ? (
                  <span>{props.countCartItems}</span>
                ) : (
                  ""
                )}
              </NavLink>
              <FontAwesomeIcon
                id="logout"
                onClick={logOutUser}
                icon={faSignOut}
                className="my-auto mx-3 navicon"
              />
              {/* <span>{user && `Welcome, ${user.username}!`}</span> */}
            </>
          )}

          {user?.isAdmin && (
            <NavLink to="/products/create">Add Product</NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
