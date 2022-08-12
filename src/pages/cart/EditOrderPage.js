import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function EditOrderPage(props) {
  const [fullname, setFullname] = useState("");
  const [street, setStreet] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const foundOrder = response.data;
        setFullname(foundOrder.address.fullname);
        setStreet(foundOrder.address.street);
        setPostal(foundOrder.address.postal);
        setCity(foundOrder.address.city);
        setState(foundOrder.address.state);
        setCountry(foundOrder.address.country);
      })
      .catch((error) => console.log(error));
  }, [orderId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      address: { fullname, street, postal, city, state, country },
    };
    const storedToken = localStorage.getItem("authToken");
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/orders/edit/${orderId}`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        navigate(`/orders/${orderId}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="EditOrderPage m-4">
      <h3 className="text-center">Edit the Order</h3>
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="text-center">
          <Button type="submit" className="mt-3" variant="primary">
            Change Details
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EditOrderPage;
