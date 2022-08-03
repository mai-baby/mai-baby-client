import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar
      className="px-5"
      bg="dark"
      variant="dark"
      sticky="top"
      expand="md"
      collapseOnSelect
    >
      <Navbar.Brand>
        <NavLink to="/">
          <img
            src="http://images6.fanpop.com/image/photos/41500000/adorable-puppies-cute-puppies-41538772-1920-1080.jpg"
            alt="brand logo"
            style={{ width: "40px" }}
          />
          Mai Baby
        </NavLink>
      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="ms-auto">
          <Nav.Link>
            <NavLink to="/">Home</NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink to="/products">Products</NavLink>
          </Nav.Link>
          <Nav.Link>
            {/* UPDATE: Add Shopping Cart or Orders!! */}
            <NavLink to="/order">My Orders</NavLink>
          </Nav.Link>

          {!isLoggedIn && (
            <>
              <Nav.Link>
                <NavLink to="/register">Sign Up</NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/login">Login</NavLink>
              </Nav.Link>
            </>
          )}

          {isLoggedIn && (
            <NavDropdown>
              <NavDropdown.Item>
                <button onClick={logOutUser}>Logout</button>
                <span>{user && user.name}</span>
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
