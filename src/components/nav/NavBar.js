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
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      className="px-5 nav-bg"
      sticky="top"
      expand="lg"
      expanded={expanded}
    >
      <Navbar.Brand>
        <NavLink to="/">Mai-Baby</NavLink>
      </Navbar.Brand>

      <Navbar.Toggle
        onClick={() => setExpanded(expanded ? false : "expanded")}
      />
      <Navbar.Collapse>
        <Nav className="ms-auto">
          <NavLink
            to="/"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          >
            Products
          </NavLink>

          {!isLoggedIn && (
            <>
              <NavLink
                to="/register"
                onClick={() => setExpanded(expanded ? false : "expanded")}
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setExpanded(expanded ? false : "expanded")}
              >
                Login
              </NavLink>
            </>
          )}

          {isLoggedIn && (
            <>
              <NavLink
                to="/products/create"
                onClick={() => setExpanded(expanded ? false : "expanded")}
              >
                Add Product
              </NavLink>
              <NavLink
                to="/orders"
                onClick={() => setExpanded(expanded ? false : "expanded")}
              >
                Orders
              </NavLink>
              <NavLink
                to="/basket"
                onClick={() => setExpanded(expanded ? false : "expanded")}
                id="cart"
              >
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
                onClick={() => setExpanded(expanded ? false : "expanded")}
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
