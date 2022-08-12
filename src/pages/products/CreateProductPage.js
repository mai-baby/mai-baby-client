import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function CreateProductPage(props) {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, shortDescription, price, brand, imageURL };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/products`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate(`/products`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="CreateProductPage m-4">
      <h3 className="text-center">LIST A NEW PRODUCT</h3>
      <Form onSubmit={handleFormSubmit}>
        <Row>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* <Form.Text>Don't share your email!</Form.Text> */}
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Short Description</Form.Label>
            <Form.Control
              type="text"
              name="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />
            {/* <Form.Text>Don't share your password!</Form.Text> */}
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {/* <Form.Text>Don't share your password!</Form.Text> */}
          </Form.Group>

          <Form.Group controlId="formBrand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            {/* <Form.Text>Don't share your password!</Form.Text> */}
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              name="imageURL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
            {/* <Form.Text>Don't share your password!</Form.Text> */}
          </Form.Group>
        </Row>
        {errorMessage && <p className="error-message">Wrong credentials!</p>}
        <div className="text-center">
          <Button type="submit" className="mt-3" variant="primary">
            List Product
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateProductPage;
