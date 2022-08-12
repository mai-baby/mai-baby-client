import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function EditProductPage(props) {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const foundProduct = response.data;
        setTitle(foundProduct.title);
        setShortDescription(foundProduct.shortDescription);
        setPrice(foundProduct.price);
        setBrand(foundProduct.brand);
        setImageURL(foundProduct.imageURL);
      })
      .catch((error) => console.log(error));
  }, [productId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { title, shortDescription, price, brand, imageURL };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Make a PUT request to update the product
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/products/${productId}`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        // Once the request is resolved successfully and the product
        // is updated we navigate back to the details page
        navigate(`/products/${productId}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="EditProductPage m-4">
      <h3 className="text-center">Edit the Product</h3>
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

          <Form.Group controlId="formShortDescription">
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

          <Form.Group controlId="formImage">
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
            Update Product
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EditProductPage;
