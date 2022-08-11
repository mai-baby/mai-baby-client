import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSignOut } from "@fortawesome/free-solid-svg-icons";

function NavBar(props) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar className="px-5 nav-bg" sticky="top" expand="md" collapseOnSelect>
      <Navbar.Brand>
        <NavLink to="/">
          {/* <img src="/logo512.png" alt="brand logo" style={{ width: "40px" }} /> */}
          Mai Baby
        </NavLink>
      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="ms-auto">
          <NavLink to="/" eventKey="1">
            Home
          </NavLink>
          <NavLink to="/products" eventKey="2">
            Products
          </NavLink>

          {!isLoggedIn && (
            <>
              <NavLink to="/register" eventKey="4">
                Sign Up
              </NavLink>
              <NavLink to="/login" eventKey="5">
                Login
              </NavLink>
            </>
          )}

          {isLoggedIn && (
            <>
              <NavLink to="/products/create" eventKey="6">
                Add Product
              </NavLink>
              <NavLink to="/orders" eventKey="7">
                Orders
              </NavLink>
              <NavLink to="/basket" eventKey="8" id="cart">
                <FontAwesomeIcon icon={faShoppingCart} className="navicon" />{" "}
                {props.countCartItems ? (
                  <span>{props.countCartItems}</span>
                ) : (
                  ""
                )}
              </NavLink>
              <FontAwesomeIcon
                onClick={logOutUser}
                icon={faSignOut}
                className="my-auto mx-3 navicon"
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
