import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";

function CheckoutPage(props) {
  const { user } = useContext(AuthContext);

  const { cartItems, totalPrice } = props;

  const [fullname, setFullname] = useState("");
  const [street, setStreet] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const pushProducts = cartItems.map((item) => item._id);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      customer: user?._id,
      products: pushProducts,
      totalPrice,
      status: "Order received",
      address: { fullname, street, postal, city, state, country },
    };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/checkout`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        props.setCartItems([]);
        navigate(`/confirmation`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="CheckoutPage m-4">
      <h3 className="text-center">Fill in your address:</h3>
      <Form onSubmit={handleFormSubmit}>
        <Row>
          <Form.Group controlId="formFullname">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formStreet">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPostal">
            <Form.Label>Postal</Form.Label>
            <Form.Control
              type="string"
              name="postal"
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formState">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>
        </Row>
        {errorMessage && <p className="error-message">Wrong credentials!</p>}
        <div className="text-center">
          <Button type="submit" className="mt-3" variant="primary">
            Order
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CheckoutPage;
