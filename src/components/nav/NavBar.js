import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSignOut } from "@fortawesome/free-solid-svg-icons";

function NavBar(props) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <Navbar className="px-5 nav-bg" sticky="top" expand="lg">
      <Navbar.Brand>
        <NavLink to="/">Mai-Baby</NavLink>
      </Navbar.Brand>

      <Navbar.Toggle eventKey="1" />
      <Navbar.Collapse>
        <Nav className="ms-auto">
          <NavLink to="/" eventKey="1">
            Home
          </NavLink>
          <NavLink to="/products" eventKey="1">
            Products
          </NavLink>

          {!isLoggedIn && (
            <>
              <NavLink to="/register" eventKey="1">
                Sign Up
              </NavLink>
              <NavLink to="/login" eventKey="1">
                Login
              </NavLink>
            </>
          )}

          {isLoggedIn && (
            <>
              <NavLink to="/products/create" eventKey="1">
                Add Product
              </NavLink>
              <NavLink to="/orders" eventKey="1">
                Orders
              </NavLink>
              <NavLink to="/basket" eventKey="1" id="cart">
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
                eventKey="1"
              />
              {/* <span>{user && `Welcome, ${user.username}!`}</span> */}
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
