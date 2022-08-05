import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar(props) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar
      className="px-5"
      bg="light"
      variant="light"
      sticky="top"
      expand="md"
      collapseOnSelect
    >
      <Navbar.Brand>
        <NavLink to="/">
          {/* <img src="/logo512.png" alt="brand logo" style={{ width: "40px" }} /> */}
          Mai Baby
        </NavLink>
      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="ms-auto">
          <Nav.Link eventKey="1">
            <NavLink to="/">Home</NavLink>
          </Nav.Link>
          <Nav.Link eventKey="2">
            <NavLink to="/products">Products</NavLink>
          </Nav.Link>
          <Nav.Link eventKey="3">
            <NavLink to="/basket">
              Basket{" "}
              {props.countCartItems ? <span>{props.countCartItems}</span> : ""}
            </NavLink>
          </Nav.Link>

          {!isLoggedIn && (
            <>
              <Nav.Link eventKey="4">
                <NavLink to="/register">Sign Up</NavLink>
              </Nav.Link>
              <Nav.Link eventKey="5">
                <NavLink to="/login">Login</NavLink>
              </Nav.Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Nav.Link eventKey="6">
                <NavLink to="/products/create">Add Product</NavLink>
              </Nav.Link>
              <Nav.Link eventKey="7">
                <button onClick={logOutUser}>Logout</button>
                <span>{user && user.name}</span>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
